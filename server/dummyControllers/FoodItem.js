import foodItem from '../dummyModels/foodItem';
import validateFoodItem from '../helpers/validateFoodItem';

class FoodItem {
  static getAll(_req, res) {
    res.status(200).json({ message: 'Retrieved all food items', foodItem });
  }

  static postFoodItem(req, res) {
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

  static updateFoodItem(req, res) {
    const updateItem = foodItem.find(c => c.id === parseInt(req.params.id, 10));
    if (!updateItem) return res.status(404).json({ message: 'The food item with the given ID was not found!' });

    const { error } = validateFoodItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    updateItem.name = req.body.name;
    updateItem.description = req.body.description;
    updateItem.price = req.body.price;
    updateItem.imageurl = req.body.imageurl;

    res.status(200).json({ message: 'Update suceeded', foodItem });
  }
}

export default FoodItem;
