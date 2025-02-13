import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext'

const Login = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const {user,setUser}= React.useContext(UserDataContext)
    const navigate=useNavigate();

    const submitHandler=async(e)=>{
        e.preventDefault();
        const userData=({
          email:email,
          password:password
        })

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData)

        if(response.status===200){

          const data=response.data

          setUser(data.user);
          localStorage.setItem('token',data.token)

          navigate('/Home')

        }

        setEmail('');
        setPassword('')
    }
  return (
    <div className="h-screen w-full flex flex-col justify-between p-4">
      {/* Top Section */}
      <div className="max-w-lg mx-auto w-full">
        {/* Uber Logo */}
        <div className="flex justify-start md:justify-center">
          <img
            className="w-16 md:w-20 lg:w-24"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={(e)=>submitHandler(e)} className="mt-10 p-4">
          <h3 className="font-semibold text-lg">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            placeholder="email@example.com"
            className="p-3 bg-[#eeeeee] w-full my-2 rounded"
          />

          <h3 className="font-semibold text-lg mt-4">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            placeholder="password"
            className="p-3 bg-[#eeeeee] w-full my-2 rounded"
          />

          <button className="w-full bg-black text-white text-lg py-3 rounded mt-8 font-semibold hover:bg-gray-800 transition">
            Login
          </button>

          <p className="mt-4 text-center font-medium">
            New here?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create New Account
            </Link>
          </p>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="py-7 flex justify-center">
        <Link
          to="/captain-login"
          className="bg-[#10b461] text-lg text-white font-semibold py-3 px-6 rounded w-full max-w-lg mx-auto text-center hover:bg-[#0f9e55] transition"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Login;
