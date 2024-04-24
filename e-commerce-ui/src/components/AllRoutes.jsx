import React from 'react'
import {Route , Routes} from 'react-router-dom';
import SignUp from './SignUp'


import App from '../App'
import SellerDashboard from '../Private/Seller/SellerDashboard';
import AddAddress from '../Private/Common/AddAddress';
import EditProfile from '../Private/Common/EditProfile'
import Cart from '../Private/Customer/Cart';
import Explore from '../Private/Customer/Explore';
import Register from '../Public/Register';
import Wishlist from '../Private/Customer/Wishlist';
import Home from '../Public/Home';
import { useAuth } from '../authcontext/AuthProvider';
import Login from '../Public/Login';

const AllRoutes = () => {

    const { user } = useAuth();

    const  {role , authenticated } = user;
    let routes = [];

    if(authenticated) {
        // render routes that are assigned to all user roles 
        // conditionaly render routes that role specific 

        (role === "SELLER") ? 
        routes.push(
            <Route key={"seller_dashboard"} path='/seller-dashboard' element={<SellerDashboard/>} />,
            <Route key={"addProduct"} path='/addproduct' element={<AddProduct/>} />
        ) 
        : (role === "CUSTOMER") && routes.push(
            <Route key={"cart"} path='/cart' element={<Cart />} />,
            <Route key={"explore"} path='/explore' element={<Explore/>} />,
            <Route key={"wishlist"} path='/wishlist' element={<Wishlist />} />
        );
        routes.push(
            <Route key={"add_address"} path='/add-address' element={<AddAddress/>} />,
            <Route key={"edit_profile"} path='/edit_profile' element={<EditProfile/>} />
        )

    } else {
        // render routes that are public and visible before login
        // 
        routes.push(
           <Route key={"explore"} path='/explore' element={<Explore/>} />,
            <Route key={"home"} path='/' element={<Home/>} />,
            <Route key={"Login"} path='/login' element={<Login/>}/>,
           <Route key={"signup"} path='/signup' element={<SignUp/>} />,
           <Route key={"seller-register"} path='/seller/register' element={<Register role={'SELLER'}/>} />,
           <Route key={"customer-register"} path='/customer/register' element={<Register role={'CUSTOMER'}/>} />,
        );
    }

    routes.map(route => console.log(route.props.path))
  return (
    <Routes>
        <Route path='/' element={<App/>}> {routes}</Route>
    </Routes>
  )
}

export default AllRoutes
