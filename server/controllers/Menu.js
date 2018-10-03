import { pool } from '../helpers/dbScript/connectLocalDb';

class Menu {
  static async getAll(req, res) {
    const client = await pool.connect();

    const { rows } = await pool.query('SELECT * FROM menu ORDER BY id DESC LIMIT 5');
    client.release();
    const menus = rows;
    res.status(200).json({ state: 'Succesful', message: 'Retrieved all menus', menus });
  }

  static async postMenu(req, res) {
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
      client.release();
      return res.status(409).json({ state: 'Failed', message: `An item with '${name}' is already in menu` });
    }

    const { rows } = await pool.query(`INSERT INTO menu (name, imageurl, description, price)
    VALUES ('${name}', '${imageurl}', '${description}', '${price}') RETURNING * `);

    client.release();

    const newlyCreatedMenu = rows;

    return res.status(201).json({ state: 'Sucessful', message: 'Created new menu', newlyCreatedMenu });
  }

  static async getSpecifiedMenu(req, res) {
    const getId = req.params.id;

    const client = await pool.connect();
    const { rows } = await pool.query(`SELECT * FROM menu WHERE id = '${getId}'`);
    client.release();

    if (rows.length === 0) {
      return res.status(404)
        .json({ state: 'Failed', message: 'The menu with the given ID was not found!' });
    }

    const retrievedMenu = rows[0];

    return res.status(200).json({ state: 'Succesful', message: 'Retrieved specified menu', retrievedMenu });
  }

  static async updateSpecifiedMenu(req, res) {
    const myUpdateId = req.params.id;
    const {
      name, imageurl, description, price
    } = req.body;

    const client = await pool.connect();
    const { rows } = await pool.query(`UPDATE menu SET name = '${name}', imageurl = '${imageurl}',
    description = '${description}', price = '${price}'
    WHERE id = ${myUpdateId} RETURNING *`);

    client.release();

    if (rows.length === 0) {
      return res.status(404)
        .json({ message: 'The menu with the given ID was not found!' });
    }

    const updatedMenu = rows[0];

    return res.status(200).json({ message: 'Updated specified menu', updatedMenu });
  }

  static async removeAMenu(req, res) {
    const deleteId = req.params.id;

    const client = await pool.connect();
    const { rows } = await pool.query(`DELETE FROM menu
     WHERE id = '${deleteId}' RETURNING *`);

    client.release();

    if (rows.length === 0) {
      return res.status(404)
        .json({ state: 'Failed', message: 'Given ID was not found' });
    }
    const deletedMenu = rows[0];
    return res.status(200)
      .json({ state: 'Sucessful', message: 'Menu is deleted!', deletedMenu });
  }
}

export default Menu;
