import React from 'react'
import { useAuth } from '../Context/AuthContent'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from "../Pages/Components/Navbar"

const ProtectRouting = () => {
    const {isLoggedIn,Loading} = useAuth()

    if (Loading){
      return(
        <>
          <p>Checking Auth please Wait...</p>
        </>
      )
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace/>
    }
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default ProtectRouting