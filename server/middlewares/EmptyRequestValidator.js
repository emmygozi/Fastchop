
/**
 * @class EmptyRequestValidator
 */
class EmptyRequestValidator {
  /**
       * @desc protect routes
       * @returns {object} json
       * @param {object} req object
       * @param {object} res object
       * @param {object} next object
       */
  static validator(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Empty request' });
    }
    next();
  }
}

export default EmptyRequestValidator;
