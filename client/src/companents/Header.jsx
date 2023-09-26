import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header p-3">
      <div className="container">
        <nav className="d-flex align-items-center justify-content-between ">
          <img src="/logo.jpg" alt="logo" />
          <div className="d-flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary"
            >
              HomeUser
            </button>
            <button
              onClick={() => navigate("/company")}
              className="btn btn-primary"
            >
              Admin
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header
