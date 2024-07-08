// src/App.jsx
import {useContext, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import AboutUs from './pages/AboutUs';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Lawyers from './pages/Lawyers';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from './main';
import axios from 'axios';

function App() {
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const response = await axios.get("http://localhost:4000/api/v1/user/client/me",{withCredentials:true});
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
      catch(error){
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  },[isAuthenticated,setIsAuthenticated,setUser]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='appointment' element={<Appointment />} />
            <Route path='about' element={<AboutUs />} />
            <Route path='contact' element={<Contact />} />
            <Route path='lawyers' element={<Lawyers />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
        <ToastContainer position='top-center'/>
      </BrowserRouter>
    </div>
  );
}

export default App;
