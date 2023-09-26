import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../companents/Header';


const Home = () => {
  let navigate = useNavigate();
  let tokenId = localStorage.getItem("token");
    const [company, companyState] = useState([]);
    const [complex, complexState] = useState([]);
    const [room, roomState] = useState(null);
    const [roomOne, roomOneState] = useState(null);
    const [calculator, calculatorState] = useState(null);
    const [companyname, companynameState] = useState(null);
    const [complexname, complexnameState] = useState(null);
    useEffect(()=>{
      if (!tokenId) {
        navigate("/login");
      }
    const asyncFn = async () => { 
      let data = await axios.get(`/company`); 
      companyState(data.data.data);
    };
    asyncFn()
    },[]);
    const handleCompany= async (e)=>{
      let company_name=e.target.value;
      companynameState(e.target.value);
      console.log(complexname);
      let {company_id}=company.find((e)=>e.company_title==company_name)
      try {
        let {data} = await axios.post(
          "/complex/companycomplex",
          {
            company_id: company_id,
          },
          {
            token: tokenId,
          }
        );
        if(data){complexState(data)}
               
      } catch (error) {
        console.log(error);    
      }

    }
    const handleRoom= async (e)=>{
      let complex_name=e.target.value;
      complexnameState(e.target.value);
      let {complex_id} = complex.find((e) => e.complex_title == complex_name);
      try {
        let { data } = await axios.post(
          "/room/roomcomplex",
          {
            complex_id: complex_id,
          }
        );
        if(data){roomState(data)}       
      } catch (error) {
        console.log(error);    
      }

    }
    const handleRoomGetOne= async (e)=>{
      let roomVal=e.target.value;
      let {room_id:roomId} = room.find((e) => e.room == roomVal);
      try {
        let { data } = await axios.get(`/room/${roomId}`);
        if(data){roomOneState(data[0]);}       
      } catch (error) {
        console.log(error);    
      }
    }
    const handleCalculator= async (e)=>{
      try {
        let { data } = await axios.post("/calculator", {
          room_id: roomOne?.room_id,
          duration: e.target.value
        });
        if(data){calculatorState(data);}       
      } catch (error) {
        console.log(error);    
      }
    }
    console.log("company", company);
    console.log("complex", complex);
    console.log("company_name", companyname);
    console.log("complexname", complexname);
    console.log("room", room);
    console.log("roomOne", roomOne);
    console.log("calculator",calculator);
    console.log(123);

  return (
    <>
      <Header />
      <section className="hero-home">
        <div className="home container pt-5">
          <h1 className="text-center pb-3">Choose a house by filtering</h1>
          <form className="d-flex homeForm justify-content-between align-items-end p-4 rounded   bg-dark">
            <span>
              <h5 className="text-center ">Building company:</h5>
              <select
                className="form-select bg-primary text-light"
                aria-label="Default select example"
                onChange={(e) => handleCompany(e)}
              >
                <option selected>Choose...</option>
                {company?.map((c, idx) => {
                  return (
                    <option key={idx} value={c.complex_id}>
                      {c.company_title}
                    </option>
                  );
                })}
              </select>
            </span>
            <span>
              <h5 className="text-center ">Comples:</h5>
              <select
                className="form-select bg-primary text-light"
                aria-label="Default select example"
                onChange={(e) => {
                  handleRoom(e);
                }}
              >
                <option selected>Choose...</option>
                {complex?.map((c, idx) => {
                  return <option key={idx}>{c.complex_title}</option>;
                })}
              </select>
            </span>
            <span>
              <h5 className="text-center ">Number of Rooms:</h5>
              <select
                className="form-select bg-primary text-light"
                aria-label="Default select example"
                onChange={(e) => {
                  handleRoomGetOne(e);
                }}
              >
                <option selected>Choose...</option>
                {room?.map((c, idx) => {
                  return <option key={idx}>{c.room}</option>;
                })}
              </select>
            </span>
            <span>
              <h5 className="text-center ">Mortgage duration:</h5>
              <select
                className="form-select bg-primary text-light"
                aria-label="Default select example"
                onChange={(e) => {
                  handleCalculator(e);
                }}
              >
                <option selected>Choose...</option>
                <option value="1">5</option>
                <option value="2">10</option>
                <option value="3">15</option>
                <option value="4">20</option>
              </select>
            </span>
          </form>
          <div className="result mt-5 homeForm d-flex justify-content-between bg-dark text-light p-4 rounded">
            <span className="p-2 item">
              <h2 className="text-center">{companyname}</h2>
              <p className="text-center">{complexname}</p>
              <p className="text-center">Room {roomOne?.room}</p>
              <p className="text-center">Price {roomOne?.price}</p>
              <p className="text-center">kv {roomOne?.kv}</p>
            </span>
            <span className="p-2 item">
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
            </span>
            <span className="p-2 item">
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
              <p className="text-center">Lorem, ipsum dolor.</p>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home
