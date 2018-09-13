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

  static updateOrder(req, res) {
    const updateOrder = myOrder.find(c => c.id === parseInt(req.params.id, 10));
    if (!updateOrder) return res.status(404).json({ message: 'The food item with the given ID was not found!' });

    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    updateOrder.status = req.body.status;
    res.status(200).json({ message: 'Update suceeded', myOrder });
  }

  static removeOrder(req, res) {
    const toRemove = myOrder.find(c => c.id === parseInt(req.params.id, 10));
    if (!toRemove) return res.status(404).json({ message: 'The food item with the given ID was not found!' });

    myOrder.splice(toRemove, 1);
    res.status(200).json({ message: 'Deleted food item', myOrder });
  }
}

export default Orders;
