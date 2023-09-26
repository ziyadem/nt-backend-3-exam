const { roomVal, updateRoomVal } = require("../validation/roomVal");

//room Mdw
const roomMdw = (req, res, next) => {
  try {
    const { error } = roomVal(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

//update room Mdw
const updateRoomMdw = (req, res, next) => {
  try {
    const { error } = updateRoomVal(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { roomMdw, updateRoomMdw };
