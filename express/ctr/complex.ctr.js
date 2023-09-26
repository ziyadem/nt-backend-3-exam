const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/config");

//getAll
const getAll = async (req, res) => {
  try {
    let result = await pool.query(`SELECT * from complex`);
    res.status(201).json({
      msg: "get complex",
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
  let { complex_id } = req.params;
  try {
    let result = await pool.query(`SELECT * from complex where complex_id=$1`, [
      complex_id,
    ]);
    if (result.rowCount == 0) {
      return res.status(400).json({ msg: "complex not found" });
    }
    res.status(201).json({
      msg: "get one complex",
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

//create complex
const createComplex = async (req, res) => {
    console.log(123);
  let { complex_title, complex_address, company_id } = req.body;
  console.log(complex_title, complex_address, company_id);
  try {
    let result = await pool.query(
      `INSERT INTO complex(complex_title, complex_address, company_id) VALUES($1, $2, $3)`,
      [complex_title, complex_address, company_id]
    );
    console.log(result);

    if (result.rowCount == 0) {
      return res.status(404).json({ msg: "user not found" });
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

//update complex
const updateComplex = async (req, res) => {
  let { complex_id: id } = req.params;
  let { complex_title, complex_address,company_id } = req.body;
  console.log(complex_title, complex_address, company_id);
  try {
    let foundedComplex = await pool.query(
      `select * from complex WHERE complex_id=$1`,
      [id]
    );
    console.log(foundedComplex);
    if (foundedComplex.rowCount == 0) {
      return res.status(404).json({ msg: "Complex not found!" });
    }
    let { complex_title: title, complex_address: address,company_id:c_id } = foundedComplex.rows[0];

    complex_title = complex_title ? complex_title : title;
    complex_address = complex_address ? complex_address : address;
    company_id = company_id ? company_id : c_id;
    
    console.log(complex_title, complex_address, company_id, id);

    let result = await pool.query(
      ` UPDATE complex SET complex_title=$1, complex_address=$2,company_id=$3 WHERE complex_id =$4`,
      [complex_title, complex_address, company_id,id]
    );
    if (result.rowCount == 0) {
      return res.status(401).json({ msg: "not complex updated" });
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

//delete complex
const deleteComplex = async (req, res) => {
  let { complex_id } = req.params;
  try {
    let result = await pool.query(` DELETE FROM complex WHERE complex_id =$1`, [
      complex_id,
    ]);
    if (result.rowCount == 0) {
      return res.status(400).json({ msg: "complex not deleted" });
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

//companyComplex
const companyComplex=async(req,res)=>{
  let {company_id}=req.body;
  try {
    let result = await pool.query(
      `select cx.complex_title,cx.complex_id  FROM complex cx
    JOIN company c ON c.company_id = cx.company_id
	  WHERE cx.company_id =$1`,
      [company_id]
    );
    console.log(result.rows);
     res.status(200).json(result.rows);  
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
    console.log(err);  
  }
}

module.exports = {
  getAll,
  getOne,
  createComplex,
  updateComplex,
  deleteComplex,
  companyComplex
};
