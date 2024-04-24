import React from 'react'
import { Link } from 'react-router-dom'

function Headers() {
  return (
    <div className='flex item-center justify-around bg-gray-200 text-slat p-2'>
      <Link to={"/home"}>Home</Link> <br/>
      <Link to={"/login"}>LogIn</Link><br/>
      <Link to={"/register"} >Register</Link>
    </div>
  )
}

export default Headers
