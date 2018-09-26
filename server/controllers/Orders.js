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

  static async postOrder(req, res) {
    const {
      menuid, quantity
    } = req.body;

    const { id } = req.aDecodedUser;

    // https://node-postgres.com/features/queries  Check for Row mode
    // It is necessary to add "rowMode: 'array" to query like this to be able to search
    // table with a string value in node pg
    const noDuplicateQuery = {
      text: 'SELECT * from orders where status = $1 and userid = $2',
      values: ['pending', `${id}`],
      rowMode: 'array',
    };
    const client = await pool.connect();
    const duplicate = await pool.query(noDuplicateQuery);

    if (duplicate.rows[0] !== undefined) {
      return res.status(409).json({ state: 'Failed', message: 'You still have a pending order' });
    }

    const validOrder = {
      text: 'SELECT * from menu where id = $1',
      values: [`${menuid}`],
      rowMode: 'array',
    };
    const isValid = await pool.query(validOrder);

    if (isValid.rows[0] === undefined) {
      return res.status(401).json({
        state: 'Failed',
        message: 'You cannot place this order because menuid referenced has not been created'
      });
    }


    const { rows } = await pool.query(`INSERT INTO orders (menuid, userid, quantity)
    VALUES ('${menuid}', '${id}', '${quantity}') RETURNING * `);

    client.release();

    const newlyCreatedMenu = rows;

    return res.status(201).json({ state: 'Sucessful', message: 'Created new menu', newlyCreatedMenu });
  }

  static async AcceptOrDeclineOrder(req, res) {
    const {
      status
    } = req.body;

    const { id } = req.aDecodedUser;

    const client = await pool.connect();
    const { rows } = await pool.query(`UPDATE orders SET status = '${status}'
    WHERE id = ${id} RETURNING *`);

    client.release();

    const updatedMenu = rows[0];

    return res.status(200).json({ message: 'Updated specified menu', updatedMenu });
  }
}

export default Orders;
