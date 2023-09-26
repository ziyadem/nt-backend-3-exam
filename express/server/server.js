const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");



//routes
const userRouter = require("../routes/user.routes.js");
const companyRouter = require("../routes/company.routes.js");
const complexRouter = require("../routes/complex.routes.js");
const roomRouter = require("../routes/room.routes.js");

dotenv.config();
const port = process.env.PORT || 7777;
const app = express();
app.use(cors());
app.use(express.static(path.join(process.cwd(), "db/files")));
app.use(express.json());
app.use(fileUpload());

app.use(userRouter);
app.use("/company", companyRouter);
app.use("/complex", complexRouter);
app.use("/room", roomRouter);
app.all("*", (req, res) => {
  res.status(404).send("Resource not founded");
});

app.listen(port, console.log("port " + port));
