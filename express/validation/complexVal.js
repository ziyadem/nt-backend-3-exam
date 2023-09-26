const Joi = require("joi");

//complex
const complexVal = (data) => {
  const schema = Joi.object({
    complex_title: Joi.string().min(2).max(50).required(),
    complex_address: Joi.string().min(3).max(50).required(),
    company_id: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(data);
};

//complex update
const updateComplexVal = (data) => {
  const schema = Joi.object({
    complex_title: Joi.string().min(2).max(50),
    complex_address: Joi.string().min(3).max(50),
    company_id: Joi.string().min(3)
  });

  return schema.validate(data);
};

module.exports = { complexVal, updateComplexVal };
