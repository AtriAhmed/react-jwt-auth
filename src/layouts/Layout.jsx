import React, { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import { ScrollRestoration } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import { App } from "@capacitor/app";
import { ToastContainer } from "react-toastify";

function Layout() {
  const location = useLocation();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    App.addListener("appUrlOpen", (data) => {
      if (data.url) {
        console.log(JSON.stringify(data));
        const url = new URL(data.url);
        console.log(url.pathname);
        navigate(url.pathname.slice(1));
      }
    });
  }, []);

  useEffect(() => {
    App.addListener("backButton", () => {
      window.history.back();
    });

    return () => {
      App.removeAllListeners();
    };
  }, []);


  return (
    <div>
      <ScrollRestoration getKey={(location) => (location.pathname === "/products" ? location.pathname : location.key)} />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default Layout;
