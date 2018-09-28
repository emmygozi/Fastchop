import express from 'express';
import Orders from '../controllers/Orders';
import HasAdminPermission from '../middlewares/controllersValidator/HasAdminPermission';
import Authorization from '../middlewares/Authorization';
import UserIdValidator from '../middlewares/UserIdValidator';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import ReqBodyValidator from '../middlewares/controllersValidator/ReqBodyValidator';


const router = express.Router();

router.get('/users/:id/orders', Authorization.auth, UserIdValidator.validator, Orders.getParticularUserOrder);
router.get('/orders', Authorization.auth, HasAdminPermission.toMakeChanges, Orders.getAll);
router.get('/orders/:id', Authorization.auth, UserIdValidator.validator, Orders.getOneOrder);
router.post(
  '/orders', Authorization.auth, EmptyRequestValidator.validator,
  ReqBodyValidator.validateOrder, ReqBodyValidator.validateOrderBody, Orders.postOrder
);
router.put(
  '/orders/:id', Authorization.auth, UserIdValidator.validator,
  HasAdminPermission.toMakeChanges, EmptyRequestValidator.validator,
  Orders.AcceptOrDeclineOrder
);

export default router;

