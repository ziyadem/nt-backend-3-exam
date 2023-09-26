const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/config");

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
   try {
      let { rows, rowCount } = await pool.query(
        ` SELECT * FROM users WHERE email = $1`,
        [email]
      );
      if (rowCount==0){return res.status(404).json({ msg: "user not found"})}
      let checkPsw = await bcrypt.compare(
        password,
        rows[0].password
      );
      if(!checkPsw){return res.status(400).json({ msg: "password invalid"})}
      let token = await jwt.sign({ id: rows[0].user_id }, process.env.SECRET_KEY, {expiresIn: "1d"});
      return res.status(200).json({ msg: 'loged!!!', token });
   } catch (err) {
      res.status(400).json({
        msg1: err.severity,
        msg2: err.detail,
      });
   }
};

//getAdmin
const getAdmin = async (req, res) => {
   try {
      let {rows} = await pool.query(` SELECT * FROM users WHERE role = admin`);
      if (userList.rowCount==0){return res.status(404).json({ msg: "admin not found"})}      
      return res.status(200).json({ msg: "loged!!!", rows });
   } catch (err) {
      res.status(400).json({
        msg1: err.severity,
        msg2: err.detail,
      });
   }
};

//REGISTER
const register=async (req,res)=>{
  try {
    const { username, email, age, password } = req.body;
    const hashPas = bcrypt.hashSync(password, 12);
    let result = await pool.query(
      `INSERT INTO users(username,email,age,password) 
    VALUES($1, $2, $3, $4)`,
      [username, email, age, hashPas]
    );
    let result1 = await pool.query(`SELECT user_id from users where email=$1`, [
      email,
    ]);
    let token = await jwt.sign({ id:result1.rows[0].user_id  }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      msg: result.command,
      token:token
    });
  } catch (err) {    
    res.status(400).json({
      msg1: err.severity,
      msg2: err.detail,
    });
  }
}



module.exports = { login, register, getAdmin };
