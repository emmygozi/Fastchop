import Validator from '../../helpers/Validator';

class ReqBodyValidator {
  static validateMenu(req, res, next) {
    const {
      name,
      description,
      price,
      imageurl
    } = req.body;


    if (!name || !description || !price || !imageurl) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Bad request, no field should not be missing',
        helpMessage: 'name: string, description: string, price: integer, imageurl: string'
      });
    }

    if (!Validator.isWhiteSpace(name) ||
    !Validator.isWhiteSpace(description) || !Validator.isWhiteSpace(price)
    || !Validator.isWhiteSpace(imageurl)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'One or more fields contained only whitespace',
        helpMessage: 'name: string, description: string, price: integer, imageurl: string'
      });
    }


    if (!Validator.hasAminLength(name) ||
    !Validator.hasAminLength(description) || !Validator.hasAminLength(imageurl)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Fields length must not be less than three characters',
      });
    }

    if (!Validator.isNumber(price)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Price must be a number',
      });
    }

    req.body = {
      name,
      price,
      description,
      imageurl
    };

    return next();
  }

  static validateOrder(req, res, next) {
    const {
      userid,
      mealid,
      quantity,
      status
    } = req.body;


    if (!userid || !mealid || !quantity || !status) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Bad request, no field should not be missing',
        helpMessage: 'userid: integer, mealid: integer, quantity: integer, status: integer'
      });
    }

    return next();
  }

  static validateOrderBody(req, res, next) {
    const {
      userid,
      mealid,
      quantity,
      status
    } = req.body;

    if (!Validator.isWhiteSpace(userid) ||
    !Validator.isWhiteSpace(mealid) || !Validator.isWhiteSpace(quantity)
    || !Validator.isWhiteSpace(status)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'One or more fields contained only whitespace',
        helpMessage: 'name: string, email: string, password: string'
      });
    }


    if (!Validator.isNumber(userid) || !Validator.isNumber(mealid)
    || !Validator.isNumber(quantity) || !Validator.isNumber(status)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Fields must be a number',
      });
    }
    next();
  }
}

export default ReqBodyValidator;
