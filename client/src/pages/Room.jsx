import React, { useState, useEffect } from "react";
import Header from "../companents/Header";
import SideBar from "../companents/SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Room = () => {
   let navigate = useNavigate();
  let tokenId = localStorage.getItem("token");
  const [complex, complexState] = useState([]);
  const [room, roomState] = useState([]);
  useEffect(() => {
    const asyncFnGetAll = async () => {
      if (!tokenId) {
        navigate("/login");
      }
      let data = await axios.get(`/complex`);
      complexState(data.data.data);
    };
    asyncFnGetAll();
    const getAllRoom = async () => {
      let data = await axios.get(`/room`);
      roomState(data.data.data);
    };
    getAllRoom();

  }, []);
  // console.log("room",room);
  console.log(123);
  console.log("complex",complex);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const room = e.target.room.value;
      const price = e.target.price.value;
      const kv = e.target.kv.value;
      const complexname = e.target.complexname.value;
      let complex_id = complex.find((e) => (e = complexname)).complex_id;
      let data = { room: room, price: price, kv: kv, complex_id: complex_id };
      let res = await axios.post(`/room`, data);
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
      <section className="ps-3 d-flex room">
        <SideBar />
        <div className="sd-right p-5">
          <form
            className="bg-dark d-flex justify-content-between align-items-end p-3 rounded"
            onSubmit={(e) => handleSubmit(e)}
          >
            <span className="cmp">
              <label htmlFor="company_title" className="company-name fs-5 pb-2">
                Room:
              </label>
              <input
                className="form-control bg-primary text-light"
                type="number"
                name="room"
                id="room"
              />
            </span>
            <span className="cmp">
              <label htmlFor="company_title" className="company-name fs-5 pb-2">
                Price:
              </label>
              <input
                className="form-control bg-primary text-light"
                type="number"
                name="price"
              />
            </span>
            <span className="cmp">
              <label htmlFor="company_title" className="company-name fs-5 pb-2">
                Kv:
              </label>
              <input
                className="form-control bg-primary text-light"
                type="number"
                name="kv"
              />
            </span>
            <span className="cmp">
              <h5 className="text-center text-primary">Complex:</h5>
              <select
                className="form-select bg-primary text-light"
                aria-label="Default select example"
                name="complexname"
              >
                <option selected>Choose...</option>
                {complex?.map((c, idx) => {
                  return (
                    <option key={idx} value="1">
                      {c.complex_title}
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
                <th scope="col">Room:</th>
                <th scope="col">Price:</th>
                <th scope="col">kv</th>
                <th scope="col">update</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody className="text-light">
              {room?.map((c, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{c.room}</th>
                    <td>{c.price}</td>
                    <td>{c.kv}</td>
                    {/* <td id={c.complex_id}>
                      <i class="fa fa-trash text-danger"></i>
                    </td>
                    <td id={c.complex_id}>
                      <i class="fa fa-pencil-square text-warning"></i>
                    </td> */}
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

export default Room;
