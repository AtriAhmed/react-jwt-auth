import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import Loader from "../Loader";
import deepEqual from "deep-equal";

export default function PrivateRoute({ component: Component, aId = 1 }) {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  async function getStatus() {
    try {
      const res = await axios.get("/login/status");
      // if (res.data.user?.type == "visitor") {
      //   navigate("/login");
      // }
      if (!deepEqual(user, res.data.user)) setUser(res.data.user);
      if (!(res.data.user?.accessId >= aId)) {
        console.log("not allowed")
        navigate("/");
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log("error", err);
      navigate(-1);
    }
  }
  useEffect(() => {
    getStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-w-screen flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <Component />;
}
