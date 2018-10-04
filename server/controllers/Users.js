import bcrypt from 'bcryptjs';
import _ from 'lodash';
import generateAuthToken from '../helpers/generateAuthToken';
import { pool } from '../helpers/dbScript/connectLocalDb';


class User {
  static async signup(req, res) {
    const {
      name, email, password, address, phone
    } = req.body;

    const anEntry = {
      name,
      email,
      password,
      address,
      phone
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


    const newUser = await pool.query(`INSERT INTO users ( name, email, password, address, phone)
      VALUES ('${name}','${email}', '${mypassword2}', '${address}', '${phone}') RETURNING id, email, role`);

    client.release();

    const userDetails = newUser.rows[0];

    const token = generateAuthToken(
      userDetails.id, userDetails.email,
      userDetails.role
    );

    const { id } = userDetails;

    return res.status(201).header('x-auth-token', token)
      .json({
        state: 'Succesful',
        user: _.pick(anEntry, ['name', 'email']),
        message: 'You have sucessfully signed up',
        id,
        token
      });
    // assign pick to a const
  }

  static async login(req, res) {
    const {
      email, password,
    } = req.body;

    const query = {
      text: 'SELECT id, email, password, role FROM users WHERE email=$1',
      values: [`${email}`],
      rowMode: 'array',
    };


    const { rows } = await pool.query(query);

    if (rows.length < 1) {
      return res.status(400).json({ state: 'Failed', message: 'Invalid email or password' });
    }

    const foundPassword = rows[0][2];

    const validPassword = await bcrypt.compare(password, foundPassword);
    if (!validPassword) return res.status(400).json({ state: 'Failed', message: 'Invalid email or password' });

    const userId = rows[0][0];
    const userMail = rows[0][1];
    const userRole = rows[0][3];

    const token = generateAuthToken(
      userId, userMail,
      userRole
    );

    const id = userId;

    res.header('x-auth-token', token).status(200)
      .json({
        state: 'Succesful',
        message: 'Logged on to site',
        id,
        token
      });
  }
}

export default User;
