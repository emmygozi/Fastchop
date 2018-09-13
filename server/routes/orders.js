import express from 'express';
import Orders from '../dummyControllers/Orders';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';


const router = express.Router();

router.get('/orders', Orders.getAll);
router.get('/orders/:id', UserIdValidator.validator, Orders.getSpecifiedOrder);
router.post('/orders', EmptyRequestValidator.validator, Orders.postOrder);
router.put(
  '/orders/:id', UserIdValidator.validator,
  EmptyRequestValidator.validator, Orders.updateOrder
);
router.delete('/orders/:id', UserIdValidator.validator, Orders.removeOrder);

export default router;
