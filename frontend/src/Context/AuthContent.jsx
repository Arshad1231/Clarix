import { createContext, useContext, useState } from "react";
import { userAuthCURD } from '../CURD/UserCURD.js'
import React, { useEffect } from 'react'



const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user,setUser] = useState(null);
    const [isLoggedIn,setisLoggedIn] = useState(false)
    const [Loading,setLoading] = useState(true)

    const refreshUser = async () => {
      const res = await userAuthCURD()
    
      if (res?.isLoggedIn) {
        setUser(res.user)
        setisLoggedIn(true)
      }
    
      setLoading(false)
    }

    useEffect(()=>{
      refreshUser()
    },[])

  return (
    <AuthContext.Provider value={{user,setUser,isLoggedIn,setisLoggedIn,Loading,setLoading,refreshUser}}>
      {children}
    </AuthContext.Provider>
  );
};
