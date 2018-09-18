import express from 'express';
import Orders from '../dummyControllers/Orders';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';
import ReqBodyValidator from '../middlewares/controllersValidator/ReqBodyValidator';


const router = express.Router();

router.get('/orders', Orders.getAll);
router.get('/orders/:id', UserIdValidator.validator, Orders.getSpecifiedOrder);
router.post(
  '/orders', EmptyRequestValidator.validator,
  ReqBodyValidator.validateOrder, ReqBodyValidator.validateOrderBody, Orders.postOrder
);
router.put(
  '/orders/:id', UserIdValidator.validator,
  EmptyRequestValidator.validator, ReqBodyValidator.validateOrder,
  ReqBodyValidator.validateOrderBody, Orders.updateOrder
);
router.delete('/orders/:id', UserIdValidator.validator, Orders.removeOrder);

export default router;
