const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*', 
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        // console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;

                // console.log(`User ${userId} joined as ${userType}`)
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketID: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketID: socket.id });
                }
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            
            // Validate received location data
            if (!location || !location.lng || !location.ltd) {
              return socket.emit("error", { message: "Invalid location" });
            }
          
            try {
              // Update the captain's location in the database
             const dat= await captainModel.findByIdAndUpdate(userId, {
                location: {
                  ltd: location.ltd,
                  lng: location.lng,
                }
              });
              
             
              
            } catch (error) {
              console.error("Error updating location:", error);
              socket.emit("error", { message: "Failed to update location" });
            }
          });
          

        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
            try {
                await userModel.findOneAndUpdate({ socketID: socket.id }, { socketID: null });
                await captainModel.findOneAndUpdate({ socketID: socket.id }, { socketID: null });
            } catch (error) {
                console.error(`Error clearing socketID for disconnected client ${socket.id}:`, error);
            }
        });
    });
}

function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        console.log(`Sending message to ${socketId}:`, messageObject);
        io.to(socketId).emit(messageObject.event,messageObject.data);
    } else {
        console.error('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
