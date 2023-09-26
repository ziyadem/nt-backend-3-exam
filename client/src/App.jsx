import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Complex from "./pages/Complex";
import Room from "./pages/Room";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/complex" element={<Complex />} />
        <Route path="/room" element={<Room />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
