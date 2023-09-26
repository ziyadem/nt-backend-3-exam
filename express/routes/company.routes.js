const express = require("express");
const router = express.Router();

//ctr
const { getAll, getOne,createCompany,updateCompany,deleteCompany } = require("../ctr/company.ctr.js");

//meddleware
const { updateCompanyMdw, companyMdw } = require("../meddleware/companyMdw.js");
const { tokenAdminMdw ,tokenUserMdw} = require("../meddleware/tokenMdw.js");

router
  .route("/")
  .get(tokenUserMdw, getAll)
  .post(tokenAdminMdw, companyMdw, createCompany);

router
  .route("/:company_id")
  .delete(tokenAdminMdw, deleteCompany)
  .put(tokenAdminMdw,updateCompanyMdw, updateCompany)
  .get(tokenUserMdw,getOne);

module.exports = router;