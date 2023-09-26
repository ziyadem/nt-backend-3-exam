const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/config");

//getAll
const getAll = async (req, res) => {
  try {
    let result = await pool.query(`SELECT * from room`);
    res.status(201).json({
      msg: "get room",
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

//getOne
const getOne = async (req, res) => {
  let { room_id } = req.params;
  try {
    let result = await pool.query(`SELECT * from room where room_id=$1`, [
      room_id,
    ]);
    if (result.rowCount == 0) {
      return res.status(400).json({ msg: "room not found" });
    }
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

//create room
const createRoom = async (req, res) => {
  let { room, price, kv, complex_id } = req.body;
  console.log(room, price, kv, complex_id);
  try {
    let {rows} = await pool.query(`SELECT room from room where complex_id=$1`, [
      complex_id
    ]);
    console.log(rows);
   const r = rows.filter((e) => e.room == room);
   console.log(r);
  if(r.length >0){return res.status(400).json({
        msg: "bunday hona mavjud!",
      })}
    let result = await pool.query(
      `INSERT INTO room(room, price, kv, complex_id) VALUES($1,$2,$3,$4)`,
      [room, price, kv, complex_id]
    );

    if (result.rowCount == 0) {
      return res.status(404).json({ msg: "room not found" });
    }
    res.status(201).json({
      msg: "Created!",
    });
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

//update room
const updateRoom = async (req, res) => {
  let { room_id: id } = req.params;
  let { room,price,kv } = req.body;
  console.log(room, price, kv);
  try {
    let foundedRoom = await pool.query(
      `select * from room WHERE room_id=$1`,
      [id]
    );
    if (foundedRoom.rowCount == 0) {
      return res.status(404).json({ msg: "Room not found!" });
    }

    let { room: room1, price: price1, kv: kv1 } = foundedRoom.rows[0];

    room = room ? room : room1;
    price = price ? price : price1;
    kv = kv ? kv : kv1;

    let result = await pool.query(
      ` UPDATE room SET room=$1, price=$2,kv=$3 WHERE room_id =$4`,
      [room, price,kv, id]
    );
    if (result.rowCount == 0) {
      return res.status(401).json({ msg: "not room updated" });
    }
    res.status(201).json({
      msg: "updated",
    });
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

//delete room
const deleteRoom = async (req, res) => {
  let { room_id } = req.params;
  try {
    let result = await pool.query(` DELETE FROM room WHERE room_id =$1`, [
      room_id,
    ]);
    if (result.rowCount == 0) {
      return res.status(400).json({ msg: "company not deleted" });
    }
    res.status(201).json({
      msg: "deleted",
    });
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

//roomComplex
const roomComplex = async (req, res) => {
  let { complex_id } = req.body;
  console.log(complex_id);
  try {
    let result = await pool.query(
    `select r.room,r.room_id,r.price,r.kv  FROM room r
    JOIN complex c ON c.complex_id = r.complex_id
	  WHERE r.complex_id =$1`,
      [complex_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

module.exports = {
  getAll,
  getOne,
  createRoom,
  updateRoom,
  deleteRoom,
  roomComplex,
};
