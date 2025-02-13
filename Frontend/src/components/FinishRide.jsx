import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {
  console.log(props.ride);

  const navigate=useNavigate()

  async function endRide(){

      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
        rideId:props.ride._id
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })

      if(response.status === 200){
       
         navigate('/Captain/Home')

      }

  }


  return (
    <div>
    <h3 onClick={()=>{props.setFinishRidePanel(false)}} className='w-full  flex items-center justify-center'>
            <i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i>
    </h3>
    
    <div className='flex flex-col'>
       <h3 className='text-xl font-semibold mb-5'>Finish this Ride</h3>

       <div className=' flex items-center justify-between w-full border-2 border-yellow-400 rounded-lg p-4 mb-2'>
         <div className='flex items-center gap-2 '>
         <img className='h-10 w-10 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww" alt="" />
         <h3 className='text-lg font-medium'>
          {props.ride?.userId.fullname.firstname + " " + props.ride?.userId.fullname.lastname}
         </h3>
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

    <button onClick={endRide} className='bg-green-600 rounded-lg p-3 px-10 w-full flex items-center justify-center  text-white font-semibold  text-black'>Finish Ride</button>
    
    </div>
    
</div>
  )
}

export default FinishRide
