import express from 'express';
import Orders from '../controllers/Orders';
import HasAdminPermission from '../middlewares/controllersValidator/HasAdminPermission';
import Authorization from '../middlewares/Authorization';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import ReqBodyValidator from '../middlewares/controllersValidator/ReqBodyValidator';


const router = express.Router();

router.get('/orders/me', Authorization.auth, HasAdminPermission.toMakeChanges, Orders.getYourOrder);
router.get('/orders', Authorization.auth, HasAdminPermission.toMakeChanges, Orders.getAll);
router.post(
  '/orders', Authorization.auth, EmptyRequestValidator.validator,
  ReqBodyValidator.validateOrder, ReqBodyValidator.validateOrderBody, Orders.postOrder
);
router.put(
  '/orders', Authorization.auth, HasAdminPermission.toMakeChanges, EmptyRequestValidator.validator,
  Orders.AcceptOrDeclineOrder
);

export default router;

