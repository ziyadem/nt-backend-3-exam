const Joi = require("joi");

//room
const roomVal = (data) => {
  const schema = Joi.object({
    room: Joi.number().integer().min(1).required(),
    price: Joi.number().integer().min(1).required(),
    kv: Joi.number().integer().min(1).required(),
    complex_id: Joi.string().min(3).max(50).required()
  });

  return schema.validate(data);
};

//room update
const updateRoomVal = (data) => {
  const schema = Joi.object({
    room: Joi.number().integer().min(1),
    price: Joi.number().integer().min(1),
    kv: Joi.number().integer().min(1),
    complex_id: Joi.string().min(3).max(50)
  });

  return schema.validate(data);
};

module.exports = { roomVal, updateRoomVal };
