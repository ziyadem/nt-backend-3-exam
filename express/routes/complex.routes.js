const express = require("express");
const router = express.Router();

//ctr
const {
  getAll,
  getOne,
  createComplex,
  updateComplex,
  deleteComplex,
  companyComplex,
  yang
} = require("../ctr/complex.ctr.js");

//meddleware
const { complexMdw, updateComplexMdw } = require("../meddleware/complexMdw.js");
const { tokenAdminMdw, tokenUserMdw } = require("../meddleware/tokenMdw.js");

router
  .route("/")
  .get(tokenUserMdw, getAll)
  .post(tokenAdminMdw, complexMdw, createComplex);
router
  .route("/:complex_id")
  .delete(tokenAdminMdw,deleteComplex)
  .put(tokenAdminMdw,updateComplexMdw, updateComplex)
  .get(tokenUserMdw,getOne);

router
  .route("/companycomplex")
  .post( companyComplex);

module.exports = router;
