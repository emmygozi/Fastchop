import express from 'express';
import FoodItem from '../dummyControllers/FoodItem';


const router = express.Router();

router.get('/foodItem', FoodItem.getAll);

export default router;