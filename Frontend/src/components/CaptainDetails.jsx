import React, { useState, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  // Check if captain is not null and has the expected properties
  if (!captain) {
    return <div>Loading...</div>; // You can add a fallback message or spinner if captain is not available.
  }

 

  return (
    <div>
      <div className='flex items-center justify-between p-3'>
        <div className='flex items-center gap-2'>
          <img
            className='h-10 w-10 rounded-full object-cover'
            src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww"
            alt=""
          />
          <h4 className='font-semibold'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4> 
        </div>
        <div>
          <h4 className='text-lg font-semibold'>₹295.50</h4>
          <p className='text-gray-600 font-medium text-sm -mt-1'>Earned</p>
        </div>
      </div>

      <div className='flex items-center gap-3 rounded-lg bg-gray-100 p-4 m-2 mt-3 justify-between'>
        <div className='flex flex-col items-center justify-center'>
          <i className="font-semibold text-l ri-timer-2-line"></i>
          <h3 className='text-medium font-semibold'>10.2</h3>
          <h4 className='text-sm text-gray-600'>Hours Online</h4>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <i className="font-semibold text-l ri-speed-up-line"></i>
          <h3 className='text-medium font-semibold'>10.2</h3>
          <h4 className='text-sm text-gray-600'>Hours Online</h4>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <i className="font-semibold text-l ri-booklet-line"></i>
          <h3 className='text-medium font-semibold'>10.2</h3>
          <h4 className='text-sm text-gray-600'>Hours Online</h4>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
