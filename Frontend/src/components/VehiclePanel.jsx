import React from 'react';

const VehiclePanel = (props) => {
  return (
    <div>
      <h3
        onClick={() => props.setVehiclePanel(false)}
        className="w-full flex items-center justify-center"
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i>
      </h3>
      <h3 className="text-xl font-semibold mb-5">Choose a Vehicle</h3>

      <div
        onClick={() =>{
          props.setConfirmRidePanel(true),
          props.setVehicleType('car')
        }}
        className="w-full bg-white flex justify-between items-center p-2 active:border-black border-2 rounded-xl mb-2"
      >
        <img
          className="w-24"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="text-base font-medium">
            UberGo <span><i className="ri-user-3-fill text-sm font-medium">4</i></span>
          </h4>
          <h4 className="text-sm font-medium">2 mins away</h4>
          <h4 className="text-xs text-gray-500 font-normal">
            Affordable, compact rides
          </h4>
        </div>
        <div className="w-1/6 flex justify-end">
          <h4 className="font-semibold text-medium">₹{props.fare.car}</h4>
        </div>
      </div>

      <div
        onClick={() =>{
          props.setConfirmRidePanel(true),
          props.setVehicleType('motorcycle')
        }}
        className="w-full bg-white flex justify-between items-center p-2 active:border-black border-2 rounded-xl mb-2"
      >
        <img
          className="w-24"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="text-base font-medium">
            Moto <span><i className="ri-user-3-fill text-sm font-medium">1</i></span>
          </h4>
          <h4 className="text-sm font-medium">3 mins away</h4>
          <h4 className="text-xs text-gray-500 font-normal">
            Affordable motorcycle rides
          </h4>
        </div>
        <div className="w-1/6 flex justify-end">
          <h4 className="font-semibold text-medium">₹{props.fare.motorcycle}</h4>
        </div>
      </div>

      <div
        onClick={() =>{
          props.setConfirmRidePanel(true),
          props.setVehicleType('auto')
        }}
        className="w-full bg-white flex justify-between items-center p-2 active:border-black border-2 rounded-xl mb-2"
      >
        <img
          className="w-24"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="text-base font-medium">
            UberAuto <span><i className="ri-user-3-fill text-sm font-medium">3</i></span>
          </h4>
          <h4 className="text-sm font-medium">2 mins away</h4>
        </div>
        <div className="w-1/6 flex justify-end">
          <h4 className="font-semibold text-medium">₹{props.fare.auto}</h4>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
