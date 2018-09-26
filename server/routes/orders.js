import express from 'express';
import Orders from '../controllers/Orders';
import HasAdminPermission from '../middlewares/controllersValidator/HasAdminPermission';
import Authorization from '../middlewares/Authorization';


const router = express.Router();

router.get('/orders/me', Authorization.auth, HasAdminPermission.toMakeChanges, Orders.getYourOrder);
router.get('/orders', Authorization.auth, HasAdminPermission.toMakeChanges, Orders.getAll);


export default router;

