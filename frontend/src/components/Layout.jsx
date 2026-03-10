import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-indigo-700 to-indigo-600 px-8 py-5 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-white font-black text-2xl tracking-tighter">
          HRMS <span className="text-indigo-200">LITE</span>
        </h1>
        <div className="text-indigo-100 text-xs font-bold uppercase tracking-widest opacity-60">
          Admin Portal
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
};

export default Layout;
