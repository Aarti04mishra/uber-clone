import React, { useRef, useState, useEffect,useContext } from 'react';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { useSocket } from "../context/SocketContext";
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import LocationTracking from '../components/LocationTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [activeType, setActiveType] = useState("pickup");
  const [fare,setFare]=useState({})
  const [ride,setRide]=useState(null)
  const [vehicleType,setVehicleType]=useState(null);
  const socket = useSocket();
  const {user}= useContext(UserDataContext);

  const navigate= useNavigate()

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  //socket implementation

  useEffect(()=>{
    if (!socket) return;

    socket.emit("join",{userType:"user",userId:user._id})
  },[socket])


  socket.on('ride-confirmed',ride =>{
     setRide(ride);
    setVehicleFoundPanel(false);
    setwaitingForDriver(true);
  })


  socket.on('ride-started',ride=>{
    setwaitingForDriver(false);
    navigate('/riding',{state:{ride}});
  })



  // Handle the suggestion fetch
  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: query },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      // Assuming the API returns an array of suggestions
      const suggestions = response.data; // This should be the mapped array from your backend
      setSuggestions(suggestions);
  

    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    
    fetchSuggestions(e.target.value); // Fetch suggestions for pickup
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    fetchSuggestions(e.target.value); // Fetch suggestions for destination
  };

  const handleSelectLocation = (location, type) => {
    if (type === 'pickup') {
      setPickup(location);
    } else {
      setDestination(location);
    }
    setSuggestions([]); // Clear suggestions
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  async function findTrip(){
    if (pickup && destination) {


      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: {pickup,destination},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data)
      const fare=response.data;

       setFare(fare)
     
      setVehiclePanel(true);  // Open vehicle panel
       setPanelOpen(false);    // Close the location panel
      } else {

      alert('Please enter both pickup and destination locations.');
    }
   }

   async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          // Config object, where headers and params go
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      console.log(response.data);
    } catch (error) {
      console.error("Error creating ride:", error.response?.data || error.message);
    }
  }
  

  // GSAP Animations
  useGSAP(() => {
    if (panelRef.current) {
      if (panelOpen) {
        gsap.to(panelRef.current, { height: '70%', duration: 0.5 });
        gsap.to(panelCloseRef.current, { opacity: 1 });
      } else {
        gsap.to(panelRef.current, { height: '0%', duration: 0.1 });
        gsap.to(panelCloseRef.current, { opacity: 0 });
      }
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFoundPanel) {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' });
    }
  }, [vehicleFoundPanel]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)' });
    }
  }, [waitingForDriver]);

  return (
    <div>
      <img
        className="w-16 md:w-20 lg:w-24 absolute left-4 top-4"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div>
        <div className="h-screen w-full">
          {/* <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          /> */}
          <LocationTracking/>
        </div>
        <div className="h-screen w-full absolute flex flex-col top-0 justify-end overflow-hidden z-100">
          <div className="bg-white p-5 rounded-t-lg h-[36%] relative">
            <h3 onClick={(e) => setPanelOpen(false)} className="right-[20px] top-[20px] absolute">
              <i ref={panelCloseRef} className="test-3xl font-semibold ri-arrow-down-wide-line opacity-0"></i>
            </h3>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <div className="line absolute w-0.5 bg-black rounded top-[85px] left-10"></div>
            <form onSubmit={(e) => submitHandler(e)}>
              <input
                onClick={() => {
                  setPanelOpen(true);
              
                }}
                onChange={handlePickupChange}
                value={pickup}
                onFocus={() => setActiveType("pickup")}
                className="p-3 bg-[#eeeeee] w-full my-2 rounded pl-10"
                type="text"
                placeholder="Add a pick up location"
              />
              <input
                onClick={() => {
                  setPanelOpen(true);
               
                }}
                onChange={handleDestinationChange}
                value={destination}
                onFocus={() => setActiveType("destination")}
                className="p-3 bg-[#eeeeee] w-full my-2 rounded pl-10"
                type="text"
                placeholder="Enter your destination"
              />


               <button className="bg-black text-white py-2 px-6 rounded-full mt-4 w-full mb-4" onClick={findTrip}>
              Find Trip
              </button>

              
            </form>
            
          </div>
          <div
  ref={panelRef}
  className="w-full h-auto  px-5 h-screen overflow-y-scroll bg-white pt-3" // Add max height and scroll
>
  <LocationSearchPanel
    suggestions={suggestions}
    setVehiclePanel={setVehiclePanel}
    setPanelOpen={setPanelOpen}
    handleSelectLocation={(address) => handleSelectLocation(address, activeType)}
  />
</div>


          {/* Vehicle Panel, Confirm Ride Panel, etc. */}
          <div  ref={vehiclePanelRef} className="fixed bottom-0 z-10 w-full px-3 py-2 bg-white translate-y-full">
            <VehiclePanel setVehicleType={setVehicleType}  fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
          </div>

          <div  ref={confirmRidePanelRef} className="fixed bottom-0 z-10 w-full px-3 py-2 bg-white translate-y-full">
            <ConfirmRide vehicleType={vehicleType}  pickup={pickup} destination={destination} fare={fare}  createRide={createRide}  setConfirmRidePanel={setConfirmRidePanel} setVehicleFoundPanel={setVehicleFoundPanel} />
          </div>

          <div ref={vehicleFoundRef} className="fixed bottom-0 z-10 w-full px-3 py-2 bg-white translate-y-full">
            <LookingForDriver  vehicleType={vehicleType}  pickup={pickup} destination={destination} fare={fare}  setVehicleFoundPanel={setVehicleFoundPanel} />
          </div>

          <div ref={waitingForDriverRef} className="fixed bottom-0 z-10 w-full px-3 py-2 bg-white translate-y-full">
            <WaitingForDriver ride={ride} setWaitingForDriver={setwaitingForDriver} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
