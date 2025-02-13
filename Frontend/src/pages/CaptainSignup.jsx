import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        vehicleType: vehicleType,
        capacity: capacity,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain);
    if (response.status === 200) {
      const data = response.data;

      setCaptain(data.captain);

      localStorage.setItem('token', data.token);

      navigate('/Captain/Home');
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setColor('');
    setPlate('');
    setCapacity('');
    setVehicleType('');
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-between px-4 md:px-6 lg:px-8">
        {/* Top Section */}
        <div className="max-w-lg mx-auto w-full">
          {/* Uber Logo */}
          <div className="flex justify-start md:justify-center py-6">
            <img
              className="w-14 md:w-20 lg:w-24"
              src="https://pngimg.com/d/uber_PNG24.png"
              alt="Uber Logo"
            />
          </div>

          {/* Signup Form */}
          <form onSubmit={(e) => submitHandler(e)} className="space-y-6">
            {/* Name Section */}
            <div>
              <h3 className="font-medium text-base mb-2">What's your name</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First name"
                  className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last name"
                  className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            {/* Email Section */}
            <div>
              <h3 className="font-medium text-base mb-2">What's your email</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="email@example.com"
                className="w-full p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* Password Section */}
            <div>
              <h3 className="font-medium text-base mb-2">Enter Password</h3>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                className="w-full p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* Vehicle Information Section */}
            <div>
              <h3 className="font-medium text-base mb-2">Vehicle Information</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                  placeholder="Color"
                  className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => {
                    setPlate(e.target.value);
                  }}
                  placeholder="Plate"
                  className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                  placeholder="Capacity"
                  className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <select
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value);
                  }}
                  className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Car">Car</option>
                  <option value="Auto">Auto</option>
                  <option value="Motorcycle">Motorcycle</option>
                </select>
              </div>
            </div>

            {/* Signup Button */}
            <button className="w-full bg-black text-white text-base md:text-base py-3 rounded font-semibold hover:bg-gray-800 transition">
              Sign Up
            </button>

            {/* Redirect to Login */}
            <p className="text-center font-medium text-sm md:text-base">
              Already have an account?{' '}
              <Link to="/captain-login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default CaptainSignup;
