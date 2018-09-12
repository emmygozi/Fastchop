import foodItem from '../dummyModels/foodItem';
import validateFoodItem from '../helpers/validateFoodItem';

class FoodItem {
  static getAll(_req, res) {
    res.status(200).json({ message: 'Retrieved all food items', foodItem });
  }

  static postFoodItem(req, res) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Empty request' });
    }
    const { error } = validateFoodItem(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const {
      name, description, price, imageurl
    } = req.body;
    const id = foodItem[foodItem.length - 1].id + 1;

    const anFoodItem = {
      id,
      name,
      description,
      price,
      imageurl
    };

    const foundItem = foodItem.find(myentry =>
      (myentry.name.toLowerCase() === name.toLowerCase()));

    if (foundItem) {
      return res.status(409).json({ message: `An item with '${name}' is already in food items` });
    }
    foodItem.push(anFoodItem);
    res.status(201).json({ message: 'Created new food item', foodItem });
  }
}

export default FoodItem;
