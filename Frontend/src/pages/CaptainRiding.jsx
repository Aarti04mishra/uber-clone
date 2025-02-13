import React, { useRef,useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {
   const [finishRidePanel,setFinishRidePanel]=useState(false);
   const finishRidePanelRef=useRef(null);
   const location=useLocation();
   const rideData=location.state?.ride

   console.log(rideData);

   useGSAP(()=>{
    if(finishRidePanel){
      gsap.to(finishRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(finishRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
   },[finishRidePanel])


  return (
    <div className='h-screen '>
    <div className='fixed flex items-center justify-between w-screen p-3'>
    <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
    <Link to='/captain/logout' className='fixed top-2 right-2 h-10 w-10 bg-white rounded-full flex items-center justify-center'>
    <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
    </div>

    <div className='h-4/5'>
    <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
    </div>
    <div onClick={()=>setFinishRidePanel(true)} className='h-1/5 p-1 bg-yellow-400 relative'>
    <h3 className='w-full  flex items-center justify-center'>
            <i className="ri-arrow-up-wide-line text-3xl text-black"></i>
    </h3>

    <div className='flex items-center justify-between px-5 mt-3'>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button  className='bg-green-600 rounded-lg p-2 px-8 text-white font-semibold text-lg'>Complete Ride</button>
    </div>
    </div>

    <div ref={finishRidePanelRef} className='fixed bottom-0 z-10 w-full px-3 py-2 bg-white translate-y-full'>
        
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel}/>
    </div>
 </div>
  )
}

export default CaptainRiding
