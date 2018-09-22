import express from 'express';
import CreateTables from '../controllers/CreateTablesLocally';

const router = express.Router();

router.get('/tablesyeah', CreateTables.userAndMenuTable, CreateTables.ordersTable, CreateTables.getNewTable);

export default router;
