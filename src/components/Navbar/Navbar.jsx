import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SigninModal from "../auth/SigninModal";

function Navbar() {
  const { user, setUser } = useAuthContext();
  const location = useLocation();
  const [show, setShow] = useState(false)

function logout(){
  localStorage.removeItem("ELCAMBA_token");
  setUser(null);
  toast.success("Signed out successfully", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

  return (
    <header className="shrink-0 fixed w-full top-0 left-0 z-[30] flex items-center h-[55px] px-4 bg-white shadow-md">

      <div className="flex items-center justify-between w-full max-w-5xl mx-auto">

        <Link className="flex items-center gap-1" to="/">
          JWT AUTH
        </Link>
       
        <div className="flex items-center gap-4">
          {user ? (
           <button onClick={()=>logout()}>Logout</button>
          ) : (
            <button onClick={()=>setShow(true)}>Login</button>
          )}

        </div>
      </div>
      <SigninModal show={show} hide={()=>setShow(false)} />
    </header>
  );
}

export default Navbar;
