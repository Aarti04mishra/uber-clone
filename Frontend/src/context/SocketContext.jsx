// src/context/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create the context
const SocketContext = createContext();

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the server
    const newSocket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

    // Log when connected
    newSocket.on("connect", () => {
      console.log("Connected to the server with ID:", newSocket.id);
    });

    // Log when disconnected
    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from the server. Reason:", reason);
    });

    setSocket(newSocket);

    // Handle cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};
