const http=require('http');
const app=require('./app');

const PORT=process.env.PORT||3000

const {initializeSocket}=require('./socket')

const server=http.createServer(app);

initializeSocket(server);

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    console.log("Socket.IO initialized.");
});