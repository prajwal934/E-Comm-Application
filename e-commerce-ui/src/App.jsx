import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Navigation from './components/Navigation'
import Register from './Public/Register'
import Login from './Public/Login'


const App = () => {

const [search , setSearch] = useState("")

  return (
    <>
    <Navigation/>
    {/* <Register /> */}
    {/* <Login/> */}
    <Outlet />
    </>
  )
}

export default App

