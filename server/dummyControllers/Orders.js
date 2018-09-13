import myOrder from '../dummyModels/orders';


class Orders {
  static getAll(_req, res) {
    res.status(200).json({ message: 'Retrieved all orders', myOrder });
  }
}

export default Orders;
