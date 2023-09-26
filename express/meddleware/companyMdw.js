const jwt = require("jsonwebtoken");
const { companyVal, updateCompanyVal } = require("../validation/companyVal");

//company Mdw
const companyMdw = (req, res, next) => {
  try {
    const { error } = companyVal(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

//update company Mdw
const updateCompanyMdw = (req, res, next) => {
  try {
    const { error } = updateCompanyVal(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { companyMdw, updateCompanyMdw };
