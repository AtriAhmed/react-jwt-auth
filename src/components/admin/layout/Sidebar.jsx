import React, { useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  InformationCircleIcon,
  ListBulletIcon,
  MapPinIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { helpCircleOutline, megaphoneOutline } from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const { user, setUser } = useAuthContext();
  const location = useLocation();

  return (
    <div
      className={`sidebar z-20 max-w-[300px] mt-[4rem] fixed lg:translate-x-0 w-full lg:w-[250px] flex flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow bg-gray-800 text-white duration-300`}
    >
      
      <Link to="/" className="flex flex-row gap-4 p-4 no-underline">

        <span>JWT AUTH</span>
      </Link>
      <Link to="/admin" className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname === "/admin" ? "bg-gray-700" : ""}`}>
        <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Accueil</span>
      </Link>
      {user.accessId >= 3 ? (
        <>
          <Link to="/admin/users" className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname?.startsWith("/admin/users") ? "bg-gray-700" : ""}`}>
            <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Utilisateurs</span>
          </Link>

        </>
      ) : (
        <></>
      )}
    </div>
  );
}
