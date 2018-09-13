import Joi from 'joi';

const validateFoodItem = (item) => {
  const schema = {
    name: Joi.string().min(5).max(70).trim()
      .required(),
    description: Joi.string().trim().min(5).max(700)
      .required(),
    price: Joi.number().integer()
      .required(),
    imageurl: Joi.string().min(5).max(350).trim()
      .required(),
  };
  return Joi.validate(item, schema);
};


export default validateFoodItem;
