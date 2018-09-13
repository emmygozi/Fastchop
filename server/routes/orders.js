import express from 'express';
import Orders from '../dummyControllers/Orders';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';


const router = express.Router();

router.get('/orders', Orders.getAll);
router.post('/orders', EmptyRequestValidator.validator, Orders.postOrder);
router.put('/orders/:id', UserIdValidator.validator, EmptyRequestValidator.validator, Orders.updateOrder);

export default router;
