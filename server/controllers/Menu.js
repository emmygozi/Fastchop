import { pool } from '../helpers/dbScript/connectLocalDb';

class Menu {
  static async getAll(req, res) {
    const client = await pool.connect();

    const { rows } = await pool.query('SELECT * FROM menu');
    client.release();
    const menus = rows;
    res.status(200).json({ state: 'Succesful', message: 'Retrieved all menus', menus });
  }

  static async postMenu(req, res) {
    // add if verified jwt is not admin return unauthorized 401
    console.log(req.aDecodedUser);
    const hasAdminPermission = req.aDecodedUser;

    if (hasAdminPermission.role !== 'admin') {
      return res.status(401)
        .json({ state: 'Failed', message: 'You do not have admin permission to perform this function' });
    }
    const {
      name, imageurl, description, price
    } = req.body;

    // https://node-postgres.com/features/queries  Check for Row mode
    // It is necessary to add "rowMode: 'array" to query like this to be able to search
    // table with a string value in node pg
    const noDuplicateQuery = {
      text: 'SELECT name from menu where name = $1',
      values: [`${name}`],
      rowMode: 'array',
    };
    const client = await pool.connect();
    const duplicate = await pool.query(noDuplicateQuery);

    if (duplicate.rows[0] !== undefined) {
      return res.status(409).json({ state: 'Failed', message: `An item with '${name}' is already in menu` });
    }

    const { rows } = await pool.query(`INSERT INTO menu (name, imageurl, description, price)
    VALUES ('${name}', '${imageurl}', '${description}', '${price}') RETURNING * `);

    client.release();

    const newlyCreatedMenu = rows;

    return res.status(201).json({ state: 'Sucessful', message: 'Created new menu', newlyCreatedMenu });
  }
}

export default Menu;
