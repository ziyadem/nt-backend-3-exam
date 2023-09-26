const express = require("express");
const router = express.Router();

//ctr
const {
  login,register
} = require("../ctr/user.ctr.js");
const {
  calculator
} = require("../ctr/company.ctr.js");

//meddleware
const { userMdw, loginMdw } = require("../meddleware/userMdw.js");
const { tokenAdminMdw ,tokenUserMdw} = require("../meddleware/tokenMdw.js");


router.route("/register").post(userMdw,register);
router.route("/login").post(loginMdw, login);

router.route("/calculator").post(tokenUserMdw, calculator);
module.exports = router;

