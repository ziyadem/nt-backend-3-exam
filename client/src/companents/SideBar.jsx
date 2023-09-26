import React from 'react';
import { Link } from "react-router-dom";


const SideBar = () => {
  return (
    <div className="sd-left  rounded d-flex flex-column gap-3 pt-2 pe-1">
      <Link to="/company" className="btn btn-primary p-3 fs-3">
        Company
      </Link>
      <Link to="/complex" className="btn btn-primary p-3 fs-3">Complex</Link>
      <Link to="/room" className="btn btn-primary p-3 fs-3">Room</Link>
    </div>
  );
}

export default SideBar
