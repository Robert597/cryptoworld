import React from 'react';
import icon from "./crypto.png";
import {Link} from "react-router-dom";
import { FaBars } from 'react-icons/fa';
const Mobile = () => {
  const toggle = () => {
    const target =  document.getElementById('mobile');
    if(target.classList.contains('hide')){
      target.classList.remove('hide');
      target.classList.add('show');
    }else   if(target.classList.contains('show')){
      target.classList.remove('show');
      target.classList.add('hide');
    }
  }
  return (
    <div className='bg-nav max-w-full h-20 flex items-center justify-between'>
          <div className='logo-container px-4 w-3/4 py-5 justify-center'>
            <Link to="/" className="text-text font-poppins font-bold text-2xl capitalize w-3/4">cryptoworld</Link>
        </div>
        <div className='w-1/4 flex justify-end' onClick={() => {
            toggle();
        }}>
            <FaBars className='text-white mr-4 text-lg cursor-pointer'/>
        </div>
    </div>
  )
}

export default Mobile