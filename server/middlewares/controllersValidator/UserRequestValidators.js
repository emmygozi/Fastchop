import Validator from '../../helpers/Validator';

class UserRequestValidator {
  static validateSignup(req, res, next) {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Bad request, no field should not be missing',
        helpMessage: 'name: string, email: string, password: string'
      });
    }


    if (Object.keys(req.body).length > 3) {
      return res.status(400).json({
        state: 'Failed',
        message: 'Fields are more than required'
      });
    }


    if (!Validator.isWhiteSpace(name) ||
    !Validator.isWhiteSpace(email) || !Validator.isWhiteSpace(password)) {
      return res.status(400).json({
        state: 'Failed',
        message: 'One or more fields contained only whitespace',
        helpMessage: 'name: string, email: string, password: string'
      });
    }

    req.body = {
      name,
      email,
      password
    };

    if (!Validator.hasAminLength(name) ||
    !Validator.hasAminLength(email) || !Validator.hasAminLength(password)) {
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
