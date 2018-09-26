import express from 'express';
import Menu from '../controllers/Menu';
import HasAdminPermission from '../middlewares/controllersValidator/HasAdminPermission';
import Authorization from '../middlewares/Authorization';


const router = express.Router();

router.get('/orders', Authorization.auth, HasAdminPermission.toMakeChanges, Menu.getAll);


export default router;

