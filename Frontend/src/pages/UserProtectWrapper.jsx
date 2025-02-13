import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(true);
  const {user,setUser} = useContext(UserDataContext);

  useEffect(() =>{
    const fetchUserProfile=async()=>{
      const token=localStorage.getItem('token');

      if(!token){
        navigate('/login');
        return;
      }
      try{
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });

       
        if(response.status===200){
          setUser(response.data);
        }

      }catch(err){
         localStorage.removeItem('token');
         navigate('/login')
      }finally{
        setIsLoading(false);
      }
    }  

    fetchUserProfile()
  },[navigate,setUser]);


  if (isLoading) {
    return <div>Loading....</div>; // Optionally render a loading spinner or placeholder here
  }

  return <div>{children}</div>;
};

export default UserProtectWrapper;
