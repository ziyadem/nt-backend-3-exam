const express = require("express");
const router = express.Router();

//ctr
const {
  getAll,
  getOne,
  createRoom,
  updateRoom,
  deleteRoom,
  roomComplex
} = require("../ctr/room.ctr.js");

//meddleware
const { roomMdw, updateRoomMdw } = require("../meddleware/roomMdw.js");
const { tokenAdminMdw, tokenUserMdw } = require("../meddleware/tokenMdw.js");

router
  .route("/")
  .get(tokenUserMdw, getAll)
  .post(tokenAdminMdw, roomMdw, createRoom);

router
  .route("/:room_id")
  .delete(tokenAdminMdw,deleteRoom)
  .put(tokenAdminMdw,updateRoomMdw, updateRoom)
  .get(tokenUserMdw,getOne);

router.route("/roomcomplex").post(tokenUserMdw,roomComplex);

module.exports = router;
