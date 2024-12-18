import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  async function getUserStatus() {
    
    try {
      setUser(res.data.user);
      return res;
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    getUserStatus();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, getUserStatus }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
