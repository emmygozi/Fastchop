import express from 'express';
// import FoodItem from '../dummyControllers/FoodItem';
import Menu from '../controllers/Menu';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
// import UserIdValidator from '../middlewares/UserIdValidator';
import ReqBodyValidator from '../middlewares/controllersValidator/ReqBodyValidator';
import Authorization from '../middlewares/Authorization';


const router = express.Router();

router.get('/menu', Menu.getAll);
router.post(
  '/menu', Authorization.auth, EmptyRequestValidator.validator,
  ReqBodyValidator.validateMenu, Menu.postMenu
);

export default router;

