import express from 'express';
import FoodItem from '../dummyControllers/FoodItem';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserIdValidator from '../middlewares/UserIdValidator';


const router = express.Router();

router.get('/foodItem', FoodItem.getAll);
router.post('/foodItem', EmptyRequestValidator.validator, FoodItem.postFoodItem);
router.put('/foodItem/:id', UserIdValidator.validator, EmptyRequestValidator.validator, FoodItem.updateFoodItem);
router.delete('/foodItem/:id', UserIdValidator.validator, FoodItem.removeFoodItem);

export default router;
