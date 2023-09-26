const Joi = require("joi");

//company validate
const companyVal = (data) => {
  const schema = Joi.object({
    company_title: Joi.string().min(3).max(50).required(),
    company_img: Joi.string().min(3),
  });

  return schema.validate(data);
};

//update validate
const updateCompanyVal = (data) => {
  const schema = Joi.object({
    company_title: Joi.string().min(3).max(50),
    company_img: Joi.string().min(3),
  });

  return schema.validate(data);
};

module.exports = { companyVal, updateCompanyVal };
