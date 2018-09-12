import foodItem from '../dummyModels/foodItem';


class FoodItem {
  // we put underscore '_' in front of req to show that it is intentionally unused
  static getAll(_req, res) {
    res.status(200).json(foodItem);
  }
}

export default FoodItem;