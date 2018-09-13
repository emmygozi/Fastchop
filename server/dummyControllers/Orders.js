import myOrder from '../dummyModels/orders';
import validateOrder from '../helpers/validateOrder';

class Orders {
  static getAll(_req, res) {
    res.status(200).json({ message: 'Retrieved all orders', myOrder });
  }

  static postOrder(req, res) {
    const { error } = validateOrder(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const {
      userid, mealid, status
    } = req.body;
    const id = myOrder[myOrder.length - 1].id + 1;

    const anOrder = {
      id,
      userid,
      mealid,
      status
    };

    myOrder.push(anOrder);
    res.status(201).json({ message: 'Created new food item', myOrder });
  }
}

export default Orders;
