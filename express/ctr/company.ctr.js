const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/config");

//getAll
const getAll = async (req, res) => {
   try {
     let result = await pool.query(
       `SELECT * from company`
     );
     res.status(201).json({
       msg: "get company",
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
  let {company_id} = req.params;
     try {
       let result = await pool.query(`SELECT * from company where company_id=$1`,[company_id]);
       if (result.rowCount == 0) {
         return res.status(400).json({ msg: "company not found" });
       }
       res.status(201).json({
         msg: "get one company",
         data: result.rows,
       });
     } catch (err) {
       res.status(400).json({
         msg1: err.severity,
         msg2: err.detail,
       });
     }
};

//create company
const createCompany = async (req, res) => {
  let {company_title,company_img}=req.body;  
  console.log(company_title, company_img);
  try {
     let result = await pool.query(`INSERT INTO company(company_title, company_img) VALUES($1, $2)`,
       [
         company_title,
         company_img
       ]
     );

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

//update company
const updateCompany = async (req, res) => {
  let { company_id:id } = req.params;
  let { company_title,company_img } = req.body;
  try {
    let foundedCompany = await pool.query(
      `select * from company WHERE company_id=$1`,[id]
    );
    if (foundedCompany.rowCount == 0){ return res.status(404).json({ msg: "Company not found!" })};
    
    let {
      company_title: title,
      company_img: img,
    } = foundedCompany.rows[0];

    company_title = company_title ? company_title : title;
    company_img = company_img ? company_img : img;

    let result = await pool.query(
      ` UPDATE company SET company_title=$1, company_img=$2 WHERE company_id =$3`,
      [company_title,company_img,id]
    );
    if(result.rowCount==0){return res.status(401).json({msg: "not company updated"});}
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

//delete company
const deleteCompany = async (req, res) => {
  let { company_id } = req.params;
  try {
    let result = await pool.query(` DELETE FROM company WHERE company_id =$1`, [
      company_id,
    ]);
    if (result.rowCount == 0) {
      return res.status(400).json({ msg: "company not deleted" });
    }
    res.status(201).json({
      msg: "deleted"
    });
  } catch (err) {
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
};

//calculator
const calculator = async (req, res) => {
  let { duration,room_id } = req.body;
  console.log(duration,room_id);
  try {
    let bank=await pool.query(`select * FROM bank`);
    let price=await pool.query(`select price FROM room WHERE room_id =$1`,[room_id]);
    let a=price.rows[0].price;
    let bank_name=[];
    bank.rows.forEach((b) => {
      if (b.max_sum > a) {
        bank_name.push(b.bank);
        return;
      }
    });
    let result = await pool.query(
      `select  r.price*0.17 as startingPaymet, r.price*0.83/($1*12) as monthPayment  FROM room r WHERE r.room_id =$2`,
      [duration,room_id]
    );
    res.status(201).json({
      msg: "malumotlar",
      bank:bank_name[0],
      data: result.rows[0]
    });
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
  createCompany,
  updateCompany,
  deleteCompany,
  calculator
};
