import React, { useState,useEffect } from 'react';
import Header from '../companents/Header';
import SideBar from '../companents/SideBar';
import axios from "axios";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

const Company = () => {
  let navigate=useNavigate()
  let token=localStorage.getItem('token')
  
    let [cpm_img,imgState]=useState(null)
    const [company, companyState] = useState([]);
    useEffect(() => {
      if (!token) {
        return navigate("/login");
      }
      const asyncFn = async () => {
        let data = await axios.get(`/company`);
        companyState(data?.data?.data);
      };
      asyncFn();
    }, []);

    const uploadPostFile = async (e) => {
      const files = e.target.files;
      console.log(files);
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "exam_three_backend");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsv0yl7sh/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const data2 = await res.json();
      let img = data2.secure_url;
      if(img){toast("upload Immage", { type: "success" });}
      imgState(img);
      console.log(img);
    };

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const company_title = e.target.companyname.value;
        console.log(company_title, cpm_img);
        let data = { company_title: company_title, company_img: cpm_img };
        let res = await axios.post(`/company`, data);
        if (res) {
          toast(res.data.msg, { type: "success" });
        }
        console.log(res);       
      } catch (error) {
          toast(error.response.data.msg1, { type: "error" });
          toast(error.response.data.msg2, { type: "error" });        
      }
    };

  return (
    <>
      <Header />
      <section className="ps-3 d-flex company">
        <SideBar />
        <div className="sd-right p-5">
          <form
            className="bg-dark d-flex justify-content-between align-items-end p-3 rounded"
            onSubmit={(e) => handleSubmit(e)}
          >
            <span className="cmp">
              <label htmlFor="company_title" className="company-name fs-5 pb-2">
                Company name:
              </label>
              <input
                className="form-control bg-primary text-light"
                type="text"
                name="companyname"
                id="companyname"
              />
            </span>
            <span className="cmp">
              <label htmlFor="company_title" className="company-name fs-5 pb-2">
                Company img:
              </label>
              <input
                className="form-control bg-primary text-light"
                type="file"
                name="company_title"
                onChange={uploadPostFile}
              />
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
                <th scope="col">Company name:</th>
                <th scope="col">Company img:</th>
                <th scope="col">delete</th>
                <th scope="col">update</th>
              </tr>
            </thead>
            <tbody>
              {company?.map((c, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{c.company_title}</td>
                    <td className='company-logo'><img width="50px" src={c.company_img} alt="logo" /></td>
                    <td id={c.company_id}>
                      <i class="fa fa-trash text-danger"></i>
                    </td>
                    <td id={c.company_id}>
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
}

export default Company
