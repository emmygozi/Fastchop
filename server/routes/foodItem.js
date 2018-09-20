import express from 'express';
import FoodItem from '../dummyControllers/FoodItem';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';
import ReqBodyValidator from '../middlewares/controllersValidator/ReqBodyValidator';


const router = express.Router();

router.get('/fooditem', FoodItem.getAll);
router.post(
  '/fooditem', EmptyRequestValidator.validator,
  ReqBodyValidator.validateMenu, FoodItem.postFoodItem
);
router.get('/foodItem/:id', UserIdValidator.validator, FoodItem.getSpecifiedFoodItem);

router.put(
  '/foodItem/:id', UserIdValidator.validator,
  EmptyRequestValidator.validator, ReqBodyValidator.validateMenu, FoodItem.updateFoodItem
);
router.delete('/fooditem/:id', UserIdValidator.validator, FoodItem.removeFoodItem);

export default router;

