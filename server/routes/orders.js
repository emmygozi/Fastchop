import express from 'express';
import Orders from '../dummyControllers/Orders';


const router = express.Router();

router.get('/orders', Orders.getAll);

export default router;
