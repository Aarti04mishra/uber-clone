import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSocket } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride,setRide]=useState(null);

  const { captain } = useContext(CaptainDataContext);
  const socket = useSocket();

  const RidePopUpRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  useEffect(() => {
    if (!captain || !socket) return;

    // Join the captain room
    socket.emit('join', { userType: 'captain', userId: captain._id });

    // Function to update location
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (error) => {
            console.error('Geolocation error:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // Update location every 10 seconds
    const locationInterval = setInterval(updateLocation, 10000);

    // Cleanup on component unmount
    return () => {
      clearInterval(locationInterval);
      
    };
  }, [captain]);


  socket.on('new-ride', (data) => {
    console.log(data); // Log before updating state
    setRide(data);
    setRidePopUpPanel(true);
  });

  async function confirmRide(){

    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{

      rideId:ride._id,
      captainId:captain._id
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }
  

  // GSAP Animation for Ride PopUp
  useGSAP(() => {
    gsap.to(RidePopUpRef.current, {
      transform: RidePopUpPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
    });
  }, [RidePopUpPanel]);

  // GSAP Animation for Confirm Ride PopUp
  useGSAP(() => {
    gsap.to(confirmRidePopUpPanelRef.current, {
      transform: confirmRidePopUpPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
    });
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen">
      {/* Header */}
      <div className="fixed flex items-center justify-between w-screen p-3">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain/logout"
          className="fixed top-2 right-2 h-10 w-10 bg-white rounded-full flex items-center justify-center"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map or Main Content */}
      <div className="h-2/3">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* Captain Details Section */}
      <div className="h-1/3 p-4">
        <CaptainDetails />
      </div>

      {/* Ride PopUp */}
      <div
        ref={RidePopUpRef}
        className="fixed bottom-0 z-10 w-full px-3 py-2 bg-white translate-y-full"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}        />
      </div>

      {/* Confirm Ride PopUp */}
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed bottom-0 z-10 w-full px-3 py-2 bg-white translate-y-full h-screen"
      >
        <ConfirmRidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
