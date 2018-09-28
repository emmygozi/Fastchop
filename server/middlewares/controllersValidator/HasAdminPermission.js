
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
}
export default HasAdminPermission;
