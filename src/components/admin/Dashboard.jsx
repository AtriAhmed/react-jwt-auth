import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import {
  Cog6ToothIcon,
  ListBulletIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { IonIcon } from "@ionic/react";
import { helpCircleOutline, megaphoneOutline } from "ionicons/icons";

export default function Dashboard() {
  const { user, setUser } = useAuthContext();

  return (
    <div className="w-full mx-auto">
    
      <div className="grid grid-cols-12 gap-4">
        {user.accessId >= 3 ? (
          <>
            <Link
              className="col-span-4 shadow-lg rounded-lg p-6 hover:bg-slate-200/75 duration-150 flex flex-col items-center justify-center"
              to="/admin/users"
            >
              <UsersIcon className="block h-10 w-10 flex-start" aria-hidden="true" /> Utilisateurs
            </Link>
           
          </>
        ) : (
          <></>
        )}
       
      </div>
    </div>
  );
}
