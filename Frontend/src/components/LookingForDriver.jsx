import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
        <h3 onClick={()=>props.setVehicleFoundPanel(false)} className='w-full  flex items-center justify-center'>
                <i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i>
        </h3>
        <h3 className='text-xl font-semibold mb-5'>Looking for a Driver</h3>
        <div className='flex flex-col'>
        <img className='w-30' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />

         <div className='w-full'>
            <div className='flex items-center gap-5 border-b-2 p-2'>
               <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                {/* <h3 className='font-medium text-lg'>562/11-A</h3> */}
                <p className='text-sm text-gray-600'>{props.pickup}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 border-b-2 p-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                {/* <h3 className='font-medium text-lg'>562/11-A</h3> */}
                <p className='text-sm text-gray-600'>{props.destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-2'>
            <i className="text-lg ri-currency-fill"></i>
             <div>
              <h3 className='font-medium text-lg'>₹{props.fare[props.vehicleType]}</h3>
              <p className='text-sm text-gray-600'>Cash Cash</p>
             </div>
            </div>
         </div>

        </div>
        
    </div>
  )
}

export default LookingForDriver
