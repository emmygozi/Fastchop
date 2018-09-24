import { pool, createUsersTable, createMenuTable, createOrdersTable } from './connectLocalDb';

class CreateTables {
  static async userAndMenuTable() {
    const client = await pool.connect();
    await pool.query(createUsersTable, () => {
      console.log('User Table Created!!');
    });

    await pool.query(createMenuTable, () => {
      client.release();
      console.log('Menu Table Created!!');
    });
  }

  static async ordersTable() {
    const client = await pool.connect();
    await pool.query(createOrdersTable, () => {
      client.release();
      console.log('Orders Table Created!!');
    });
  }

  static async getNewTable() {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM orders');
    client.release();
    const orders = rows;
    console.log({ message: 'Retrieved empty table orders', orders });
  }
}

CreateTables.userAndMenuTable();
CreateTables.ordersTable();
CreateTables.getNewTable();
