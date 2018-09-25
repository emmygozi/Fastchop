import express from 'express';
import Menu from '../controllers/Menu';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';
import ReqBodyValidator from '../middlewares/controllersValidator/ReqBodyValidator';
import HasAdminPermission from '../middlewares/controllersValidator/HasAdminPermission';
import Authorization from '../middlewares/Authorization';


const router = express.Router();

router.get('/menu', Menu.getAll);
router.get('/menu/:id', UserIdValidator.validator, Menu.getSpecifiedMenu);
router.post(
  '/menu', Authorization.auth, EmptyRequestValidator.validator,
  ReqBodyValidator.validateMenu, HasAdminPermission.toMakeChanges, Menu.postMenu
);

export default router;

