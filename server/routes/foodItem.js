import express from 'express';
import FoodItem from '../dummyControllers/FoodItem';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';


const router = express.Router();

router.get('/fooditem', FoodItem.getAll);
router.get('/fooditem/:id', UserIdValidator.validator, FoodItem.getSpecifiedFoodItem);
router.post('/fooditem', EmptyRequestValidator.validator, FoodItem.postFoodItem);
router.put(
  '/fooditem/:id', UserIdValidator.validator,
  EmptyRequestValidator.validator, FoodItem.updateFoodItem
);
router.delete('/fooditem/:id', UserIdValidator.validator, FoodItem.removeFoodItem);

export default router;
