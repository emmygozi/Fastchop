import { pool, createUsersTable, createMenuTable, createOrdersTable } from '../helpers/dbScript/connectLocalDb';

class CreateTables {
  static async userAndMenuTable(req, res, next) {
    await pool.query(createUsersTable, () => {
      console.log('User Table Created!!');
    });

    await pool.query(createMenuTable, () => {
      console.log('Menu Table Created!!');
    });
    next();
  }

  static async ordersTable(req, res, next) {
    await pool.query(createOrdersTable, () => {
      console.log('Orders Table Created!!');
    });
    next();
  }

  static async getNewTable(req, res) {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM orders');
    client.release();
    const orders = rows;
    res.status(200).json({ message: 'Retrieved empty table orders', orders });
  }
}

export default CreateTables;
