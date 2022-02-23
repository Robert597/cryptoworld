import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import icon from "./crypto.png";


const Main = () => {
  return (
    <div className='w-screen min-h-screen mainscreen flex flex-col items-center py-8 bigtablet:py-2'>
     <div className='py-2 bigtablet:py-0'>
    <img src={icon} alt="icon"/>
     </div>
     <div className='py-2'>
       <h1 className='text-text font-poppins text-4xl font-bold'>CRYPTOWORLD</h1>
     </div>
     <div className='w-full bigtablet:w-1/2'>
     <p className=" text-center capitalize text-white font-poppins text-4xl font-bold mb-4">Track Your cryptocurrency news and data in realtime</p>
     </div>
     <div className='py-4 w-full mb-4'>
      <Link to="/home" className='text-white w-full  flex justify-center' ><button className='bouncy flex items-center drop-shadow-lg justify-center bg-text py-4 rounded-lg px-8 text-2xl w-3/4 bigtablet:w-1/2 text-center'>Let's go <FaArrowRight className='ml-2'/></button></Link>
     </div>
        </div>
  )
}

export default Main;