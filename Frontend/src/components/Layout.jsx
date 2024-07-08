// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

const Layout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
