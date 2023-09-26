const { userVal,loginVal } = require("../validation/userVal");

//user Mdw
const userMdw = (req, res, next) => {
  try {
    const { error } = userVal(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};
//login Mdw
const loginMdw = (req, res, next) => {
  try {
    const { error } = loginVal(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { userMdw,loginMdw };
