import express from 'express';
import Users from '../controllers/Users';
import EmptyRequestValidator from '../middlewares/EmptyRequestValidator';
import UserRequestValidators from '../middlewares/controllersValidator/UserRequestValidators';


const router = express.Router();

router.post(
  '/auth/signup', EmptyRequestValidator.validator,
  UserRequestValidators.validateSignup, Users.signup
);

router.post(
  '/auth/login', EmptyRequestValidator.validator,
  UserRequestValidators.validateLogin, Users.login
);

export default router;

