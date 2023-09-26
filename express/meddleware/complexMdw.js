
const { complexVal, updateComplexVal } = require("../validation/complexVal");

//complex Mdw
const complexMdw = (req, res, next) => {
  try {
    const { error } = complexVal(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

//update complex Mdw
const updateComplexMdw = (req, res, next) => {
  try {
    const { error } = updateComplexVal(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { complexMdw, updateComplexMdw };
