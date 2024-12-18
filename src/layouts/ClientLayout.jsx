import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar";

function ClientLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Sidebar />
      <div
        className={`pt-[55px] grow grid grid-cols-1 scroll-smooth customer-page-container ml-[250px]`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default ClientLayout;
