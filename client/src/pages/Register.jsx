import React from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  let tokenId = localStorage.getItem("token");
  useEffect(() => {
    if (tokenId) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const username = e.target.username.value;
      const confirmPassword = e.target.confirmPassword.value;
      const age = e.target.age.value;
      const password = e.target.password.value;
      if(password !== confirmPassword){
        return toast("confirmPassword nod defined", { type: "error" });
      }
      console.log(email, password);
      let data = { email: email, password: password ,age:age,username:username};
      let res = await axios.post(`/register`, data);
      if (res) {
        toast(res.data.msg, { type: "success" });
      }
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      toast(error.response.data.msg1, { type: "error" });
      toast(error.response.data.msg2, { type: "error" });
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center login">
      <div className="w-50 border p-5 rounded bg-dark bg-opacity-25">
        <h1 className="text-center pb-5 text-primary fs-1">Register</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            required
            name="username"
            className="form-control mb-4"
            id="username"
            placeholder="Your username"
          />
          <input
            type="email"
            required
            name="email"
            id="email"
            className="form-control mb-4"
            placeholder="Your email"
          />
          <input
            type="number"
            required
            name="passageword"
            className="form-control mb-4"
            id="age"
            placeholder="Your age"
          />
          <input
            type="password"
            required
            name="password"
            className="form-control mb-4"
            id="password"
            placeholder="Your password"
          />
          <input
            type="password"
            required
            name="confirmPassword"
            className="form-control mb-4"
            id="confirmPassword"
            placeholder="Your confirmPassword"
          />
          <button className="btn btn-primary w-100">Submit</button>
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
