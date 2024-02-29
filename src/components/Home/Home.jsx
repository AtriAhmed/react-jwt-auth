import React from "react";
import { useAuthContext } from "../../contexts/AuthProvider";

function Home() {
  const {user, setUser} = useAuthContext();
  return (
    <>
      <div className={`shadow bg-white m-5 p-10 rounded-xl`}>
        {user ? user.username : "There is no user connected"}
        </div>
    </>
  );
}

export default Home;
