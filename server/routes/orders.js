import express from 'express';
import Orders from '../dummyControllers/Orders';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';


const router = express.Router();

router.get('/orders', Orders.getAll);
router.post('/orders', EmptyRequestValidator.validator, Orders.postOrder);

export default router;
