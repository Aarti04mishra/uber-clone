import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/captain-login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        if (response.status === 200) {
          setCaptain(response.data); // Set captain data here
        }
      } catch (error) {
        console.error('Error fetching captain profile:', error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainProfile();
  }, [navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default CaptainProtectWrapper;
