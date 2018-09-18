import myOrder from '../dummyModels/orders';

class Orders {
  static getAll(_req, res) {
    res.status(200).json({ message: 'Retrieved all orders', myOrder });
  }

  static postOrder(req, res) {
    const {
      userid, mealid, quantity, status
    } = req.body;
    const id = myOrder[myOrder.length - 1].id + 1;

    const anOrder = {
      id,
      userid,
      mealid,
      quantity,
      status
    };

    myOrder.push(anOrder);
    res.status(201).json({ message: 'Created new food item', myOrder });
  }

  static updateOrder(req, res) {
    const updateOrder = myOrder.find(order => order.id === parseInt(req.params.id, 10));
    if (!updateOrder) return res.status(404).json({ message: 'The food item with the given ID was not found!' });

    updateOrder.status = req.body.status;
    res.status(200).json({ message: 'Update suceeded', myOrder });
  }

  static removeOrder(req, res) {
    const toRemove = myOrder.find(order => order.id === parseInt(req.params.id, 10));
    if (!toRemove) return res.status(404).json({ message: 'The food item with the given ID was not found!' });

    myOrder.splice(toRemove, 1);
    res.status(200).json({ message: 'Deleted food item', myOrder });
  }

  static getSpecifiedOrder(req, res) {
    const specifiedOrder = myOrder.findIndex(order => order.id === parseInt(req.params.id, 10));
    if (specifiedOrder === -1) {
      return res.status(404)
        .json({ message: 'The food item with the given ID was not found!' });
    }

    const anOrder = myOrder[specifiedOrder];

    res.status(200).json({ message: 'Retrieved specified food item', anOrder });
  }
}

export default Orders;
