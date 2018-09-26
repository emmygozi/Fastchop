import { pool } from '../helpers/dbScript/connectLocalDb';

class Orders {
  static async getYourOrder(req, res) {
    const { id } = req.aDecodedUser;
    const client = await pool.connect();

    const { rows } =
    await pool
      .query(`SELECT orders.id, menu.name, orders.dateadded,
      orders.quantity
      FROM orders INNER JOIN menu ON orders.menuid=menu.id where orders.id = ${id};`);
    client.release();
    const menus = rows;
    res.status(200).json({ state: 'Succesful', message: 'Retrieved all orders', menus });
  }

  static async getAll(req, res) {
    const client = await pool.connect();

    const { rows } =
    await pool
      .query(`SELECT orders.id, menu.name, orders.dateadded,
      orders.quantity
      FROM orders INNER JOIN menu ON orders.menuid=menu.id`);
    client.release();
    const menus = rows;
    res.status(200).json({ state: 'Succesful', message: 'Retrieved all orders', menus });
  }
}

export default Orders;
