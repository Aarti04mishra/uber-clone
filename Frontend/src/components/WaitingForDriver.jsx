import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
    <h3 onClick={()=>{props.setConfirmRidePanel(false)}} className='w-full  flex items-center justify-center'>
            <i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i>
    </h3>
    
    <div className='flex flex-col'>
    <div className='p-2 flex justify-between text-right items-center'>
        <div className='h-24 w-24 rounded-full object-center overflow-hidden bg-red-800'>
        <img className='h-full w-full object-center' src="https://images.unsplash.com/photo-1618306842557-a2515acf2112?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGltYWdlfGVufDB8fDB8fHww" alt="" />
        </div>
        <div>
            <h3 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname}</h3>
            <h3 className='font-semibold text-lg'>{props.ride?.captain.vehicle.plate}</h3>
            <p className='text-xs text-gray-600 font-medium'>Maruti Suzuki Alto</p>
            <h3 className='text-s font-medium'>{props.ride?.otp}</h3>
        </div>
    </div>
     <div className='w-full pb-2'>
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
    </div>
    
</div>
  )
}

export default WaitingForDriver
