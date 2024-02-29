import { faBox, faBoxArchive, faBoxOpen, faChevronDown, faHouse, faUserShield, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { gridOutline, megaphoneOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { faHeart, faMessage, faRectangleList, faUser } from "@fortawesome/free-regular-svg-icons";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../contexts/AuthProvider";

function Sidebar() {

  const location = useLocation();
  const { user } = useAuthContext();

  function routeClasses() {
    let str = "";

    if (location?.pathname === "/") {
      str += "scr1350:hidden z-20 ";

    }

    if (location?.pathname.startsWith("/customer")) {
      str += "scr1200:h-[calc(100%_-_55px)] scr1200:top-[55px] z-20 scr1200:z-10 scr1200:translate-x-0 ";

    }

    return str;
  }

  return (
    <>
      <div className={`fixed top-0 left-0 mt-[40px] w-full h-full scr500:w-[250px] bg-white shadow-md ${routeClasses()}`} style={{ transition: "transform .3s" }}>
        
        <div className="relative h-full py-10 px-3 overflow-y-auto">
          <ul className="flex flex-col gap-1 text-[17px] text-black ">
            
            <li>
              <Link
                className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                  location?.pathname === "/" ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
                }`}
                to={"/"}
              >
                <HomeIcon className="block h-5 w-5 flex-start" aria-hidden="true" />
                <span>Accueil</span>
              </Link>
            </li>
            {user ? (
              <>
                {user?.accessId > 1 ? (
                  <li>
                    <Link
                      className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                        location?.pathname?.startsWith("/admin") ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
                      }`}
                      to={"/admin"}
                    >
                      <FontAwesomeIcon icon={faUserShield} className="" />
                      <span>Interface Admin</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                
              </>
            ) : (
              ""
            )}
            
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
