
class HasAdminPermission {
  static toMakeChanges(req, res, next) {
    // add if verified jwt is not admin return unauthorized 401
    const hasAdminPermission = req.aDecodedUser;

    if (hasAdminPermission.role !== 'admin') {
      return res.status(401)
        .json({ state: 'Failed', message: 'You do not have admin permission to perform this function' });
    }
    return next();
  }

  static canUpdateOrder(req, res, next) {
    const {
      status
    } = req.body;
    const validEnumUpdate = ['New', 'Processing', 'Cancelled', 'Complete'];
    console.log(status);

    if (validEnumUpdate.indexOf(status) === -1) {
      console.log(validEnumUpdate.indexOf(status));
      return res.status(400)
        .json({ state: 'Failed', message: 'You cannot update order status with an invalid entry' });
    }
    return next();
  }
}
export default HasAdminPermission;
