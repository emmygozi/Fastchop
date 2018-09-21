import { Pool } from 'pg';
import dotenv from 'dotenv';
import foodItem from '../dummyModels/foodItem';

dotenv.config();

const mydata = process.env.DATABASE_NAME;

const pool = new Pool({
  connectionString: mydata
});

class FoodItem {
  static async getAll(req, res) {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM menu');
    client.release();
    const menus = rows;
    res.status(200).json({ message: 'Retrieved all menus', menus });
  }
  static postFoodItem(req, res) {
    const {
      name, description, price, imageurl
    } = req.body;
    const id = foodItem[foodItem.length - 1].id + 1;

    const aFoodItem = {
      id,
      name,
      description,
      price,
      imageurl
    };

    const foundItem = foodItem.find(mySearchValue =>
      (mySearchValue.name.toLowerCase() === name.toLowerCase()));

    if (foundItem) {
      return res.status(409).json({ message: `An item with '${name}' is already in food items` });
    }
    foodItem.push(aFoodItem);
    res.status(201).json({ message: 'Created new food item', aFoodItem });
  }

  static updateFoodItem(req, res) {
    const updateItem = foodItem.find(food => food.id === parseInt(req.params.id, 10));
    if (!updateItem) return res.status(404).json({ message: 'The food item with the given ID was not found!' });

    updateItem.name = req.body.name;
    updateItem.description = req.body.description;
    updateItem.price = req.body.price;
    updateItem.imageurl = req.body.imageurl;

    res.status(200).json({ message: 'Update suceeded', updateItem });
  }

  static removeFoodItem(req, res) {
    const removeItem = foodItem.find(food => food.id === parseInt(req.params.id, 10));
    if (!removeItem) return res.status(404).json({ message: 'The food item with the given ID was not found!' });

    foodItem.splice(removeItem, 1);
    res.status(200).json({ message: 'Deleted food item', removeItem });
  }

  static getSpecifiedFoodItem(req, res) {
    const specifiedItem = foodItem.findIndex(food => food.id === parseInt(req.params.id, 10));
    if (specifiedItem === -1) {
      return res.status(404)
        .json({ message: 'The food item with the given ID was not found!' });
    }

    const aFoodItem = foodItem[specifiedItem];

    res.status(200).json({ message: 'Retrieved specified food item', aFoodItem });
  }
}

export default FoodItem;
