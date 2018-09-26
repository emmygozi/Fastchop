import { pool } from '../helpers/dbScript/connectLocalDb';

class Orders {
  static async getAll(req, res) {
    const client = await pool.connect();

    const { rows } = await pool.query('SELECT * FROM orders');
    client.release();
    const menus = rows;
    res.status(200).json({ state: 'Succesful', message: 'Retrieved all orders', menus });
  }
}

export default Orders;
