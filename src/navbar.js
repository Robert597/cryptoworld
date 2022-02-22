import React from 'react';
import {Link} from "react-router-dom";
import { FaHome, FaNewspaper, FaBitcoin} from "react-icons/fa";
import icon from "./crypto.png";

const Navbar = () => {
  return (
    <div className="nav-container h-screen  w-full bg-nav">
        <div className='logo-container flex items-center w-full py-5 justify-center'>
           <div className='imgContainer w-1/4'>
                <img src={icon} alt="iconimage"/>
            </div>
            <Link to="/" className="text-text font-poppins font-bold text-md laptop:text-2xl  capitalize w-3/4">cryptoworld</Link>
        </div>
        <div className='linkContainer'>
            <ul className='navLinks'>
                <li><Link to = "/home" className='flex text-white font-poppins text-base items-center  py-4 px-4 hover:bg-text '><FaHome className='mr-4 text-2xl'/>Home</Link></li>
                <li><Link to = "/cryptocurrencies"  className='flex text-white font-poppins text-base items-center  py-4 px-4 hover:bg-text'><FaBitcoin className='mr-4 text-2xl'/>Cryptocoins</Link></li>
                <li><Link to = "/news"  className='flex text-white font-poppins text-base items-center  py-4 px-4 hover:bg-text'><FaNewspaper className='mr-4 text-2xl'/>News</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar;