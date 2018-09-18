import express from 'express';
import FoodItem from '../dummyControllers/FoodItem';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';
import ReqBodyValidator from '../middlewares/controllersValidator/ReqBodyValidator';


const router = express.Router();

router.get('/foodItem', FoodItem.getAll);
router.get('/foodItem/:id', UserIdValidator.validator, FoodItem.getSpecifiedFoodItem);
router.post(
  '/foodItem', EmptyRequestValidator.validator,
  ReqBodyValidator.validateFood, FoodItem.postFoodItem
);
router.put(
  '/foodItem/:id', UserIdValidator.validator,
  EmptyRequestValidator.validator, ReqBodyValidator.validateFood, FoodItem.updateFoodItem
);
router.delete('/fooditem/:id', UserIdValidator.validator, FoodItem.removeFoodItem);

export default router;

