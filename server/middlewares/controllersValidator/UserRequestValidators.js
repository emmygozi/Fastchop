import Validator from '../../helpers/Validator';

class UserRequestValidator {
  static validateSignup(req, res, next) {
    const {
      name,
      email,
      password,
      address,
      phone
    } = req.body;

    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Bad request, no field should not be missing',
        helpMessage: 'name: string, email: string, password: string'
      });
    }


    if (Object.keys(req.body).length > 5) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Fields are more than required'
      });
    }


    if (!Validator.isWhiteSpace(name) ||
    !Validator.isWhiteSpace(email) || !Validator.isWhiteSpace(password)
    || !Validator.isWhiteSpace(address) || !Validator.isWhiteSpace(phone)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'One or more fields contained only whitespace',
        helpMessage: 'name: string, email: string, password: string'
      });
    }

    req.body = {
      name,
      email,
      password,
      address,
      phone
    };

    if (!Validator.isNumber(phone)) {
      res.status(400).json({
        state: 'Failed',
        message: 'Fields must be a number',
      });
    }

    if (!Validator.hasAminLength(name) ||
    !Validator.hasAminLength(email) || !Validator.hasAminLength(password)
    || !Validator.hasAminLength(address) || !Validator.hasAminLength(phone)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Fields length must not be less than three characters',
      });
    }

    if (!Validator.isEmail(email)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Email format must be similar to mail@something.com',
      });
    }

    next();
  }

  static validateLogin(req, res, next) {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Bad request, no field should not be missing',
        helpMessage: 'name: string, email: string, password: string'
      });
    }

    if (Object.keys(req.body).length > 2) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Fields are more than required'
      });
    }

    if (!Validator.isWhiteSpace(email) || !Validator.isWhiteSpace(password)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'One or more fields contained only whitespace',
        helpMessage: 'name: string, email: string, password: string'
      });
    }

    req.body = {
      email,
      password
    };

    if (!Validator.hasAminLength(email) || !Validator.hasAminLength(password)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Fields length must not be less than three characters',
      });
    }

    if (!Validator.isEmail(email)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Email format must be similar to mail@something.com',
      });
    }


    next();
  }
}

export default UserRequestValidator;
