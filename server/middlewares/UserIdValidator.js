
/**
 * @class UserIdValidator
 */
class UserIdValidator {
  /**
       * @desc protect routes
       * @returns {object} json
       * @param {object} req object
       * @param {object} res object
       * @param {object} next object
       */
  static validator(req, res, next) {
    if ((Number(req.params.id) !== parseInt(req.params.id, 10))
    || (Math.sign(req.params.id) === -1)) {
      return res.status(401).json({ state: 'Failed', message: 'Given ID is not valid' });
    }
    next();
  }
}
export default UserIdValidator;
