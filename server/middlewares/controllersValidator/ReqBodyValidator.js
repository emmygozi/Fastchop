import Validator from '../../helpers/Validator';

class ReqBodyValidator {
  static validateMenu(req, res, next) {
    const {
      name,
      description,
      price,
      imageurl
    } = req.body;


    req.body = {
      name: name.trim(),
      imageurl: imageurl.trim(),
      description: description.trim(),
      price: price.trim()
    };

    if (!name || !description || !price || !imageurl) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Bad request, no field should not be missing',
        helpMessage: 'name: string, description: string, price: integer, imageurl: string'
      });
    }

    if (!Validator.hasAminLength(name) || !Validator.hasAminLength(description)) {
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

    return next();
  }

  static validateOrder(req, res, next) {
    const {
      userid,
      mealid,
      quantity,
      status
    } = req.body;

    req.body = {
      userid: userid.trim(),
      mealid: mealid.trim(),
      quantity: quantity.trim(),
      status: status.trim()
    };

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
