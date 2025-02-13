import React,{ useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext'

const Signup = () => {
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {user,setUser}=React.useContext(UserDataContext)
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
   
   const newUser=({
     fullname:{
      firstname:firstName,
      lastname:lastName
     },
     email:email,
     password:password
   })
 

   const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)
  

   if(response.status === 201){
     const data=response.data

     setUser(data.user)
     localStorage.setItem('token',data.token)

     navigate('/Home')
   }

   setFirstName('');
   setLastName('');
   setEmail('');
   setPassword('')
   
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 md:px-6 lg:px-8">
      {/* Top Section */}
      <div className="max-w-lg mx-auto w-full">
        {/* Uber Logo */}
        <div className="flex justify-start md:justify-center py-6">
          <img
            className="w-16 md:w-20 lg:w-24"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        {/* Signup Form */}
        <form onSubmit={(e) => submitHandler(e)} className="space-y-6">
          {/* Name Section */}
          <div>
            <h3 className="font-medium text-lg mb-2">What's your name</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={firstName}
                onChange={(e)=>{
                  setFirstName(e.target.value)
                }}
                placeholder="First name"
                className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e)=>{
                  setLastName(e.target.value)
                }}
                placeholder="Last name"
                className="w-1/2 p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Email Section */}
          <div>
            <h3 className="font-medium text-lg mb-2">What's your email</h3>
            <input
              type="email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              placeholder="email@example.com"
              className="w-full p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Password Section */}
          <div>
            <h3 className="font-medium text-lg mb-2">Enter Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              placeholder="Password"
              className="w-full p-3 text-sm md:text-base bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>


          {/* Signup Button */}
          <button className="w-full bg-black text-white text-base md:text-lg py-3 rounded font-semibold hover:bg-gray-800 transition">
            Create an Account
          </button>

          {/* Redirect to Login */}
          <p className="text-center font-medium text-sm md:text-base">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="py-4">
        <p className="text-xs text-center text-gray-600">
          By proceeding, you consent to get calls, WhatsApp, or SMS messages, including by automated means, from Uber and its affiliates to the email provided.
        </p>
      </div>
    </div>
  );
};

export default Signup;
