import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import AddNewLawyers from "./pages/AddNewLawyers";
import AddNewAdmin from "./pages/AddNewAdmin";
import Lawyers from "./pages/Lawyers";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import SidebarComponent from "./components/Sidebar.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { Context } from './main.jsx';
import axios from 'axios';

function App() {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", { withCredentials: true });
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
        <SidebarComponent />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lawyer/addnew" element={<AddNewLawyers />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/lawyers" element={<Lawyers />} />
        </Routes>
      <ToastContainer position='top-center' autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
