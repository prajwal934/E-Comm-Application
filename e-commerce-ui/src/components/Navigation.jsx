import { useState } from "react";
import LoginCard from "./LoginCard";
import more from "../Public/images/more.png";
import logo from "../Public/images/logo.svg";
import profile from "../Public/images/profile.svg";
import dropdown from "../Public/images/dropdown.svg";
import header_cart from "../Public/images/header_cart.svg";
import Store from "../Public/images/Store.svg";
import NavDropdown from "./NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../authcontext/AuthProvider";


function Navigation({ className }) {
  const [hovered, setHovered] = useState(false);
  const [dropdownHover, setDropdownhover] = useState(false);

  const { user } = useAuth();

const {userName , role , authenticated} = user;


  return (
    <header>
      <nav
        className={`${className} w-full h-16 flex justify-around items-center fixed top-0 z-50 bg-slate-300 `}
      >
        <div className="right">
          <div className="logo ">
            <img src={logo} alt="" className="h-10" />
          </div>
        </div>
        <div className="search  w-[45vw] py-1.5 px-4 flex items-center rounded-md text-lg bg-[#F0F5FF] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <i
            className="fa fa-search text-xl text-[#717478] "
            aria-hidden="true"
          ></i>
          <input
            type="text"
            className="w-[90%] ms-3 bg-[#F0F5FF] outline-none placeholder:text-[#717478]"
            placeholder="Search Products, Brands and More"
          />
        </div>

        <div className="left w-1/3 flex items-center justify-around ">
          <div
            className="login group hover:bg-blue-700 px-1 py-2 rounded flex items-center gap-1"
            onMouseOver={() => {
              setHovered(true);
            }}
            onMouseOut={() => {
              setHovered(false);
            }}
          >
            <div>
              <LoginCard hovered={hovered} />
            </div>

            <img
              src={profile}
              alt=""
              className="w-6 hover:cursor-pointer group-hover:invert "
            />
           <Link to="/login">
           <p className="group-hover:invert group-hover:font-medium"> 
              {
                authenticated ? userName : 'Login'
              }
            </p>
           </Link>
            <img
              src={dropdown}
              alt=""
              className="w-3 group-hover:invert group-hover:rotate-180 ease-in-out duration-200 translate-y-1 "
            />
          </div>

          {
            authenticated && role == 'SELLER' ? 
            <NavLink>
              <div className="cart hover:cursor-pointer flex items-center">
                <img src={header_cart} alt="" className="w-6" />
                <p>Orders</p>
              </div>
            </NavLink>
            : 
            <NavLink>
            <div className="cart hover:cursor-pointer flex items-center">
              <img src={header_cart} alt="" className="w-6" />
              <p>Cart</p>
            </div>
          </NavLink>
          }
          

          {
            authenticated && role === 'SELLER' ? '':
            <Link to="/seller/register">
            <div className="seller w-44 hover:cursor-pointer  hover:bg-blue-600  rounded flex items-center">
              <img
                src={Store}
                alt="store"
                // width="24px"
                // height={"24px"}
                className="w-6"
              />
              <p>Become a Seller</p>
            </div> 
            </Link>
          }
          
          <div
            className="3dot hover:cursor-pointerhover:border rounded-lg p-1  hover:shadow-sm"
            onMouseOver={() => {
              setDropdownhover(true);
            }}
            onMouseOut={() => {
              setDropdownhover(false);
            }}
          >
            <img src={more} alt="" className="w-5" />
            <div>
              <NavDropdown hovered={dropdownHover} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
