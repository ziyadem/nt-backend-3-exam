const jwt = require("jsonwebtoken");
const pool = require("../db/config");

//admin Mdw
const tokenAdminMdw = async (req, res, next) => {
  let token = req.headers.token;
  const JwtVerify = async (token) => {
    try {
      let {id} = await jwt.verify(token, process.env.SECRET_KEY);     
      if(id=='947d65ee-044a-4a48-9a83-51ec13bdce47'){
          return next();
      }else{
        return res.status(400).json({
          msg: "Token adminniki emas",
        });
      }     
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({
          msg: "Token xato iltimos qayta login qiling!",
        });
      } else
        return res.status(400).json({
          msg: "Token muddati tugagan iltimos qayda kiring!",
        });
    }
    return;
  };
  let data = await JwtVerify(token);
};

//user Mdw
const tokenUserMdw = async (req, res, next) => {
  let token = req.headers.token;
    const JwtVerify = async (token) => {
      try {
        let UserInfo = await jwt.verify(token, process.env.SECRET_KEY);
        return next();
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          return res.status(400).json({
            msg: "Token xato iltimos qayta login qiling!",
          });
        } else
          return res.status(400).json({
            msg: "Token muddati tugagan iltimos qayda kiring!",
          });
      }
      return;
    };
   let data=await JwtVerify(token);
   
};

module.exports = { tokenAdminMdw, tokenUserMdw };
