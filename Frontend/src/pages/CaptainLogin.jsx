import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captainData
      );

      if (response.status === 200) {
        const data = response.data;
      
        setCaptain(data.captain); // Set captain data to context
        localStorage.setItem('token', data.token);
        navigate('/Captain/Home');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }

    setEmail('');
    setPassword('');
  };

  // Log captain value after state has been updated
  useEffect(() => {
    // console.log('Updated captain from context:', captain);
  }, [captain]); // This will run every time the captain state is updated

  return (
    <div className="h-screen w-full flex flex-col justify-between p-4">
      {/* Top Section */}
      <div className="max-w-lg mx-auto w-full">
        {/* Uber Logo */}
        <div className="flex justify-start md:justify-center">
          <img
            className="w-14 md:w-20 lg:w-24"
            src="https://pngimg.com/d/uber_PNG24.png"
            alt="Uber Logo"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={submitHandler} className="mt-2 p-4">
          <h3 className="font-semibold text-lg">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@example.com"
            className="p-3 bg-[#eeeeee] w-full my-2 rounded"
          />

          <h3 className="font-semibold text-lg mt-4">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            className="p-3 bg-[#eeeeee] w-full my-2 rounded"
          />

          <button className="w-full bg-black text-white text-lg py-3 rounded mt-8 font-semibold hover:bg-gray-800 transition">
            Login
          </button>

          <p className="mt-4 text-center font-medium">
            Join a fleet?{' '}
            <Link to="/captain-signup" className="text-blue-500 hover:underline">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="py-7 flex justify-center">
        <Link
          to="/login"
          className="bg-[#d5622d] text-lg text-white font-semibold py-3 px-6 rounded w-full max-w-lg mx-auto text-center hover:bg-[#0f9e55] transition"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
