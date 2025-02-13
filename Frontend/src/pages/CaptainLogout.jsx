import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const CaptainLogout = () => {
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(true); // State for loading feedback
  

      useEffect(() => {
        const token=localStorage.getItem('token');
        if (!token) {
            // If no token exists, redirect to login immediately
            navigate('/captain-login');
            return;
          }


      axios
      .get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // Clear token and navigate to login
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        alert('Something went wrong during logout. Please try again.');
      })
      .finally(() => {
        // Stop the loading state
        setIsLoading(false);
      });
  }, [navigate])



  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    {isLoading ? (
      <div className="text-center">
        <p className="text-lg font-medium">Logging you out...</p>
        {/* You can add a spinner here */}
      </div>
    ) : (
      <p className="text-lg font-medium text-red-500">
        Failed to logout. Please try again.
      </p>
    )}
  </div>
  )
}

export default CaptainLogout
