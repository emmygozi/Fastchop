import express from 'express';
import Orders from '../controllers/Orders';
import HasAdminPermission from '../middlewares/controllersValidator/HasAdminPermission';
import Authorization from '../middlewares/Authorization';


const router = express.Router();

router.get('/orders', Authorization.auth, HasAdminPermission.toMakeChanges, Orders.getYourOrder);


export default router;

