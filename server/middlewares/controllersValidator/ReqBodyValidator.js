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
      menuid,
      quantity
    } = req.body;


    if (!(menuid) || !(quantity)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Bad request, no field should not be missing',
        helpMessage: 'userid: integer, quantity: integer'
      });
    }

    return next();
  }

  static validateOrderBody(req, res, next) {
    const {
      menuid,
      quantity
    } = req.body;

    if (!Validator.isWhiteSpace(menuid) || !Validator.isWhiteSpace(quantity)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'One or more fields contained only whitespace',
        helpMessage: 'userid: integer, quantity: integer'
      });
    }


    if (!Validator.isNumber(menuid)
    || !Validator.isNumber(quantity)) {
      res.status(400).json({
        state: 'Failed',
        message: 'Fields must be a number',
      });
    }
    next();
  }
}

export default ReqBodyValidator;
