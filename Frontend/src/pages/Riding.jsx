import React, { useRef, useState, useEffect,useContext } from 'react';

import {Link, useLocation} from 'react-router-dom'
import { useSocket } from "../context/SocketContext";
import { useNavigate } from 'react-router-dom';


const Riding = (props) => {

  const location=useLocation();
  const {ride}=location.state || {}
  const socket = useSocket();
  const navigate=useNavigate();

  socket.on('ride-ended',()=>{
    navigate('/home')
  })
  

  return (
 <div className='h-screen '>
    <Link to='/home' className='fixed top-2 right-2 h-10 w-10 bg-white rounded-full flex items-center justify-center'>
    <i className="text-lg font-medium ri-home-5-line"></i>
    </Link>

    <div className='h-1/2'>
    <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
    </div>
    <div className='h-1/2 p-4'>
    <div className='flex justify-between  items-center'>
        <div className='h-[70px] w-[70px] rounded-full object-center overflow-hidden'>
        <img className='h-full w-full object-center' src="https://images.unsplash.com/photo-1618306842557-a2515acf2112?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGltYWdlfGVufDB8fDB8fHww" alt="" />
        </div>
        <div className='text-right'>
            <h3 className='text-lg font-medium'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h3>
            <h3 className='font-semibold text-lg'>{ride?.captain.vehicle.plate}</h3>
            <p className='text-xs text-gray-600 font-medium'>Maruti Suzuki Alto</p>
        </div>
    </div>
     <div className='flex gap-2 flex-col items-center justify-between w-full pb-2'>
        <div className='w-full mt-5'>
        <div className='flex items-center gap-5 border-b-2 p-2 w-full'>
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            {/* <h3 className='font-medium text-lg'>562/11-A</h3> */}
            <p className='text-sm text-gray-600'>{ride?.destination}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-2 w-full'>
        <i className="text-lg ri-currency-fill"></i>
         <div>
          <h3 className='font-medium text-lg'>₹{ride?.fare}</h3>
          <p className='text-sm text-gray-600'>Cash Cash</p>
         </div>
        </div>
        </div>
     </div>

     
    
    <button className='bg-green-600 rounded-lg p-2 text-white font-semibold w-full mt-3'>Make a payment</button>
    </div>
    
 </div>
  )
}

export default Riding
