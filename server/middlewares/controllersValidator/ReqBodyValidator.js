import Validator from '../../helpers/Validator';

class ReqBodyValidator {
  static validateFood(req, res, next) {
    const {
      name,
      description,
      price,
      imageurl
    } = req.body;

    if (!name || !description || !price || !imageurl) {
      return res.status(400).json({
        message: 'Bad request, no field should not be missing',
      });
    }

    if (!Validator.hasAminLength(name) || !Validator.hasAminLength(description)) {
      return res.status(400).json({
        message: 'Fields length must not be less than three',
      });
    }

    if (!Validator.isNumber(price)) {
      return res.status(400).json({
        message: 'Price must be a number',
      });
    }

    req.body = {
      name: name.trim(),
      description: description.trim(),
      price: price.trim()
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
        message: 'Bad request, no field should not be missing',
      });
    }


    if (!Validator.isNumber(userid) || !Validator.isNumber(mealid)
    || !Validator.isNumber(quantity) || !Validator.isNumber(status)) {
      return res.status(400).json({
        message: 'Fields must be a number',
      });
    }

    req.body = {
      userid: userid.trim(),
      mealid: mealid.trim(),
      quantity: quantity.trim(),
      status: status.trim()
    };
    return next();
  }
}

export default ReqBodyValidator;
