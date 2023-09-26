import React, { useState, useEffect } from "react";
import Header from "../companents/Header";
import SideBar from "../companents/SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Complex = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  
  const [company, companyState] = useState([]);
  const [complex, complexState] = useState([]);
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    const asyncFn = async () => {
      let data = await axios.get(`/company`);
      companyState(data.data.data);
    };
    asyncFn();

    const asyncFnGetAll = async () => {
      let data = await axios.get(`/complex`);
      complexState(data.data.data);
    };
    asyncFnGetAll();
  }, []);
  console.log(complex);

   const handleCreateComplex = async (e) => {
     try {
       e.preventDefault();
       const complex_title = e.target.complexname.value;
       const complex_address = e.target.complexaddress.value;
       const company_name = e.target.cmp_id.value;
      let company_id= company.find(e=>e=company_name).company_id;
       let data = {
         complex_title: complex_title,
         complex_address: complex_address,
         company_id: company_id,
       };
       console.log(data);
       let res = await axios.post(`/complex`, data);
       console.log(res);
       if (res) {
         toast(res.data.msg, { type: "success" });
       }
     } catch (error) {
       toast(error.response.data.msg1, { type: "error" });
       toast(error.response.data.msg2, { type: "error" });
     }
   };




  return (
    <>
      <Header />
      <section className="ps-3 d-flex complex">
        <SideBar />
        <div className="sd-right p-5">
          <form
            className="bg-dark d-flex justify-content-between align-items-end p-3 rounded "
            onSubmit={(e) => {
              handleCreateComplex(e);
            }}
          >
            <span className="cmp">
              <label
                htmlFor="company_title"
                className="company-name fs-5 pb-2 text-primary"
              >
                Complex name:
              </label>
              <input
                className="form-control bg-primary text-light"
                type="text"
                name="complexname"
                id="complexname"
              />
            </span>
            <span className="cmp">
              <label
                htmlFor="company_title"
                className="company-name fs-5 pb-2 text-primary"
              >
                Complex address:
              </label>
              <input
                className="form-control bg-primary text-light"
                type="text"
                name="complexaddress"
                id="complexaddress"
              />
            </span>
            <span className="cmp">
              <label htmlFor="company_title" className="company-name fs-5 pb-2">
                Company name:
              </label>
              <select
                className="form-select bg-primary text-light"
                aria-label="Default select example"
                name="cmp_id"
                id="cmp_id"
              >
                <option selected>Choose...</option>
                {company?.map((c, idx) => {
                  return (
                    <option
                      key={idx}
                      value={c.company_title}
                      add={c.company_title}
                    >
                      {c.company_title}
                    </option>
                  );
                })}
              </select>
            </span>
            <span className="cmp1">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </span>
          </form>

          <table className="table table-dark table-hover table-striped mt-5 rounded">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Complex name:</th>
                <th scope="col">Complex address:</th>
                <th scope="col">delete</th>
                <th scope="col">update</th>
              </tr>
            </thead>
            <tbody>
              {complex?.map((c, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{c.complex_title}</td>
                    <td>{c.complex_address}</td>
                    <td id={c.complex_id}>
                      <i class="fa fa-trash text-danger"></i>
                    </td>
                    <td id={c.complex_id}>
                      <i class="fa fa-pencil-square text-warning"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Complex;

//svager
