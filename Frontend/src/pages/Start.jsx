import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex flex-col">
      {/* Logo */}
      <div className="w-full flex justify-start p-5 md:p-8">
        <img
          className="w-16 md:w-20 lg:w-24"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-end md:justify-center flex-1 w-full">
        <div className="bg-white w-full md:max-w-md lg:max-w-lg md:rounded-lg md:shadow-xl px-6 py-8 mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
            Get started with Uber
          </h2>
          <Link
            to="/login"
            className="mt-6 flex justify-center w-full bg-black text-white text-lg md:text-xl lg:text-2xl py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
