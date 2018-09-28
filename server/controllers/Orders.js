import { pool } from '../helpers/dbScript/connectLocalDb';

class Orders {
  static async getParticularUserOrder(req, res) {
    const userId = parseInt(req.params.id, 10);
    console.log(userId);
    const client = await pool.connect();

    const { rows } =
    await pool
      .query(`SELECT orders.id, orders.dateadded, menu.name, menu.description, menu.price, 
      orders.quantity
      FROM orders INNER JOIN menu ON orders.menuid=menu.id where orders.userid = ${userId};`);

    const myUserDetails =
      await pool
        .query(`SELECT name, email, address, phone from users WHERE id = ${userId}`);
    client.release();

    const user = myUserDetails.rows[0];

    if (rows.length === 0) {
      return res.status(400)
        .json({ state: 'Failed', message: 'No orders yet for this user' });
    }
    const {
      id, dateadded, name, description, price, quantity
    } = rows[0];

    const menu = {
      name, description, price, quantity
    };
    res.status(200).json({
      state: 'Succesful',
      message: 'Retrieved all your orders',
      id,
      dateadded,
      menu,
      user
    });
  }

  static async getAll(req, res) {
    const client = await pool.connect();

    const { rows } =
    await pool
      .query(`SELECT orders.id, orders.dateadded, menu.name, menu.description, menu.price, 
      orders.quantity
      FROM orders INNER JOIN menu ON orders.menuid=menu.id ORDER BY orders.id desc`);
    client.release();


    res.status(200).json({
      state: 'Succesful',
      message: 'Retrieved all orders',
      rows
    });
  }

  static async getOneOrder(req, res) {
    const orderId = req.params.id;
    const client = await pool.connect();

    const { rows } =
    await pool
      .query(`SELECT orders.id, orders.dateadded, menu.name, menu.description, menu.price, 
      orders.quantity
      FROM orders INNER JOIN menu ON orders.menuid=menu.id where orders.id=${orderId}`);
    client.release();

    if (rows.length === 0) {
      return res.status(400).json({
        state: 'Failed',
        message: 'You cannot get an unexisting order'
      });
    }
    const {
      id, dateadded, name, description, price, quantity
    } = rows[0];
    const anOrder = {
      name, description, price, quantity
    };
    res.status(200).json({
      state: 'Succesful',
      message: 'Retrieved an order',
      id,
      dateadded,
      anOrder
    });
  }


  static async postOrder(req, res) {
    const {
      menuid, quantity
    } = req.body;

    const userId = req.aDecodedUser.id;

    // https://node-postgres.com/features/queries  Check for Row mode
    // It is necessary to add "rowMode: 'array" to query like this to be able to search
    // table with a string value in node pg
    const noDuplicateQuery = {
      text: 'SELECT * from orders where status = $1 and userid = $2',
      values: ['pending', `${userId}`],
      rowMode: 'array',
    };
    const client = await pool.connect();
    const duplicate = await pool.query(noDuplicateQuery);

    if (duplicate.rows[0] !== undefined) {
      client.release();
      return res.status(409).json({ state: 'Failed', message: 'You still have a pending order' });
    }

    const validOrder = {
      text: 'SELECT * from menu where id = $1',
      values: [`${menuid}`],
      rowMode: 'array',
    };
    const isValid = await pool.query(validOrder);

    if (isValid.rows[0] === undefined) {
      client.release();
      return res.status(401).json({
        state: 'Failed',
        message: 'You cannot place this order because menuid referenced has not been created'
      });
    }


    await pool.query(`INSERT INTO orders (menuid, userid, quantity)
    VALUES ('${menuid}', '${userId}', '${quantity}') `);

    const newlyCreatedOrder = await pool
      .query(`SELECT orders.id, orders.dateadded, menu.name, menu.description, menu.price, 
      orders.quantity
      FROM orders INNER JOIN menu ON orders.menuid=menu.id where orders.userid = ${userId};`);


    client.release();

    const {
      id, dateadded, name, description, price
    } = newlyCreatedOrder.rows[0];
    const createdOrder = {
      name, description, price, quantity
    };
    res.status(201).json({
      state: 'Succesful',
      message: 'Created new menu',
      id,
      dateadded,
      createdOrder
    });
  }

  static async AcceptOrDeclineOrder(req, res) {
    const {
      status
    } = req.body;

    const { id } = req.params;

    const validUpdate = {
      text: 'SELECT * from orders where id = $1',
      values: [`${id}`],
      rowMode: 'array',
    };
    const client = await pool.connect();
    const isValid = await pool.query(validUpdate);

    if (isValid.rows[0] === undefined) {
      return res.status(400).json({
        state: 'Failed',
        message: 'You cannot update an unexisting order'
      });
    }

    const { rows } = await pool.query(`UPDATE orders SET status = '${status}'
    WHERE id = ${id} RETURNING *`);
    client.release();

    const updatedMenu = rows[0];

    return res.status(200).json({ message: 'Updated specified order', updatedMenu });
  }
}

export default Orders;
