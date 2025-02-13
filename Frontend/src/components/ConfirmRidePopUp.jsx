import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

const ConfirmRidePopUp = (props) => {
  const navigate=useNavigate();
  const[otp,setOtp]=useState('');

    const SubmitHandler = async (e)=>{
       e.preventDefault();

       console.log(props.ride._id);
       console.log(otp);

       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: { 
          rideId:props.ride._id,
          otp:otp
         },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

       console.log(response);

       if(response.status==200){
         props.setConfirmRidePopUpPanel(false);
         props.setRidePopUpPanel(false);
         navigate('/captain-riding',{state:{ride:props.ride}})
       }
    }


  return (

    <div>
    <h3 onClick={()=>props.setRidePopUpPanel(false)} className='w-full  flex items-center justify-center'>
            <i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i>
    </h3>
    
    <div className='flex flex-col'>
       <h3 className='text-xl font-semibold mb-5'>New Ride Available!</h3>

       <div className=' flex items-center justify-between w-full bg-yellow-400 rounded-lg p-3 mb-2'>
         <div className='flex items-center gap-2 '>
         <img className='h-10 w-10 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww" alt="" />
         <h3 className='text-lg font-medium'>{props.ride?.userId.fullname.firstname + " " + props.ride?.userId.fullname.lastname}</h3>
         </div>

         <h3 className='font-semibold'>2.2 KM</h3>
       </div>
     <div className='w-full pb-2 mb-2'>
        <div className='flex items-center gap-5 border-b-2 p-2'>
           <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            {/* <h3 className='font-medium text-lg'>562/11-A</h3> */}
            <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 border-b-2 p-2'>
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            {/* <h3 className='font-medium text-lg'>562/11-A</h3> */}
            <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-2'>
        <i className="text-lg ri-currency-fill"></i>
         <div>
          <h3 className='font-medium text-lg'>₹{props.ride?.fare}</h3>
          <p className='text-sm text-gray-600'>Cash Cash</p>
         </div>
        </div>
     </div>

  
     <form onSubmit={(e)=>SubmitHandler(e)} className='w-full'>
     <input value={otp} onChange={(e)=>{
              setOtp(e.target.value)
            }} className="p-3 bg-[#eeeeee] w-full my-2 rounded pl-6 font-mono" type="text" placeholder='Enter OTP' />
     <button  className='bg-green-600 mt-4 flex justify-center rounded-lg p-3 text-white font-semibold'>Confirm</button>
     <button onClick={()=>{props.setRidePopUpPanel(false),props.setConfirmRidePopUpPanel(false)}} className='w-full bg-red-600 rounded-lg p-3 text-white font-semibold mt-2 text-white'>Ignore</button>
     </form>
   
    </div>
    
</div>
  )
}

export default ConfirmRidePopUp
