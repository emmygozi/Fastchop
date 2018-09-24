import { pool, createUsersTable, createMenuTable, createOrdersTable } from './connectLocalDb';

class CreateTables {
  static async userAndMenuTable() {
    await pool.query(createUsersTable, () => {
      console.log('User Table Created!!');
    });

    await pool.query(createMenuTable, () => {
      console.log('Menu Table Created!!');
    });
  }

  static async ordersTable() {
    await pool.query(createOrdersTable, () => {
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
