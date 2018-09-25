import { pool } from '../helpers/dbScript/connectLocalDb';

class Menu {
  static async getAll(req, res) {
    const client = await pool.connect();

    const { rows } = await pool.query('SELECT * FROM menu');
    client.release();
    const menus = rows;
    res.status(200).json({ state: 'Succesful', message: 'Retrieved all menus', menus });
  }
}

export default Menu;
