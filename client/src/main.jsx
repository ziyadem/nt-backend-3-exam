import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// route
import {BrowserRouter as Router} from 'react-router-dom'

// redux
// import { Provider } from 'react-redux'
// import store from './store/index'

//axios
axios.defaults.baseURL = "http://localhost:2003";
axios.defaults.headers.common['Content-Type']='application/json';
let tokenId = localStorage.getItem('token')
if(tokenId) axios.defaults.headers.common["token"]=tokenId;

// stayle
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
    <ToastContainer theme="colored" />
  </Router>
);
