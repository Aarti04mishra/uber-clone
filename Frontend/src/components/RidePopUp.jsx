import React, { useState } from 'react'

const RidePopUp = (props) => {
  const { ride, setRidePopUpPanel, setConfirmRidePopUpPanel,confirmRide } = props;

  // Safely access the ride object and its properties
  const firstname=ride?.userId.fullname.firstname;
  const lastname=ride?.userId.fullname.lastname;
  const pickup = ride?.pickup;
  const destination = ride?.destination;
  const fare = ride?.fare;

  return (
    <div>
      <h3 onClick={() => setRidePopUpPanel(false)} className='w-full flex items-center justify-center'>
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i>
      </h3>

      <div className='flex flex-col'>
        <h3 className='text-xl font-semibold mb-5'>New Ride Available!</h3>

        {/* Display ride info only if available */}
        {ride ? (
          <div className='flex items-center justify-between w-full bg-yellow-400 rounded-lg p-3 mb-2'>
            <div className='flex items-center gap-2'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww" alt="" />
              <h3 className='text-lg font-medium'>{firstname + " " + lastname}</h3>
            </div>

            <h3 className='font-semibold'>2.2 KM</h3>
          </div>
        ) : (
          <div className="text-gray-500">No ride available</div>
        )}

        {/* Only show the ride details if the ride object exists */}
        {ride && (
          <div className='w-full pb-2 mb-2'>
            <div className='flex items-center gap-5 border-b-2 p-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <p className='text-sm text-gray-600'>{pickup}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 border-b-2 p-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <p className='text-sm text-gray-600'>{destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-2'>
              <i className="text-lg ri-currency-fill"></i>
              <div>
                <h3 className='font-medium text-lg'>₹{fare}</h3>
                <p className='text-sm text-gray-600'>Cash Cash</p>
              </div>
            </div>
          </div>
        )}

        <div className='mt-1 flex items-center justify-between w-full'>
          <button onClick={() => setRidePopUpPanel(false)} className='bg-gray-300 rounded-lg p-3 px-10 text-white font-semibold text-black'>
            Ignore
          </button>
          <button onClick={() => {setConfirmRidePopUpPanel(true),confirmRide()}} className='bg-green-600 rounded-lg p-3 px-10 text-white font-semibold'>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp
