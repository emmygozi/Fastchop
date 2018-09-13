import Joi from 'joi';

const validateOrders = (order) => {
  const schema = {
    userid: Joi.number().integer()
      .required(),
    mealid: Joi.number().integer()
      .required(),
    status: Joi.number().integer().min(0).max(2)
      .required(),
  };
  return Joi.validate(order, schema);
};


export default validateOrders;
