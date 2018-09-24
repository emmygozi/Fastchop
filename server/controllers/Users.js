import bcrypt from 'bcryptjs';
import _ from 'lodash';
import generateAuthToken from '../helpers/generateAuthToken';
import { pool } from '../helpers/dbScript/connectLocalDb';


class User {
  static async signup(req, res) {
    const {
      name, email, password
    } = req.body;

    const anEntry = {
      name,
      email,
      password
    };

    const query = {
      text: 'SELECT email FROM users WHERE email=$1',
      values: [`${email}`],
      rowMode: 'array',
    };

    const client = await pool.connect();
    const { rows } = await pool.query(query);
    if (rows.length > 0) {
      return res.status(409).json({ state: 'Failed', message: 'A user with same email is already registered' });
    }
    const salt = await bcrypt.genSalt(10);
    const mypassword2 = await bcrypt.hash(anEntry.password, salt);


    const newUser = await pool.query(`INSERT INTO users ( name, email, password)
      VALUES ('${name}','${email}', '${mypassword2}') RETURNING id, email, role`);

    client.release();

    const userDetails = newUser.rows[0];

    const token = generateAuthToken(
      userDetails.id, userDetails.email,
      userDetails.role
    );

    return res.status(201).header('x-auth-token', token)
      .json({
        state: 'Succesful',
        user: _.pick(anEntry, ['name', 'email']),
        message: 'You have sucessfully signed up'
      });
    // assign pick to a const
  }
}

export default User;
