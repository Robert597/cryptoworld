import React from 'react';
import {Link} from "react-router-dom";
import { FaHome, FaNewspaper,  FaBitcoin} from "react-icons/fa";

const Mobilemenu = () => {
  return (
    <div>
        <div className='linkContainer'>
            <ul className='navLinks'>
                <li onClick={() => {
                   document.getElementById('mobile').classList.remove('show');
                   document.getElementById('mobile').classList.add('hide');
                }}><Link to = "/home" className='flex text-white font-poppins text-base items-center  py-4 px-4 hover:bg-text '><FaHome className='mr-4 text-2xl'/>Home</Link></li>
                <li  onClick={() => {
                   document.getElementById('mobile').classList.remove('show');
                   document.getElementById('mobile').classList.add('hide');
                }}><Link to = "/cryptocurrencies"  className='flex text-white font-poppins text-base items-center  py-4 px-4 hover:bg-text'><FaBitcoin className='mr-4 text-2xl'/>Cryptocurrencies</Link></li>
                <li  onClick={() => {
                   document.getElementById('mobile').classList.remove('show');
                   document.getElementById('mobile').classList.add('hide');
                }}><Link to = "/news"  className='flex text-white font-poppins text-base items-center  py-4 px-4 hover:bg-text'><FaNewspaper className='mr-4 text-2xl'/>News</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Mobilemenu;