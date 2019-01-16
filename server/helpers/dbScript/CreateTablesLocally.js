import { pool, createUsersTable } from './connectLocalDb';

class CreateTables {
  static async userAndMenuTable() {
    const client = await pool.connect();
    await pool.query(createUsersTable, () => {
      console.log('User Table Created!!');
    });
    client.release();
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
CreateTables.getNewTable();
