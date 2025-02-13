require('dotenv').config();
const cors=require('cors')
const express=require('express');
const app=express();
const cookieParser=require("cookie-parser");
const connectToDB=require("./db/db");
const userRoutes=require("./routes/user.router");
const captainRoutes=require("./routes/captain.router");
const mapRoutes=require("./routes/maps.router");
const rideRoutes=require("./routes/ride.router");

const corsOptions = {
    origin: '*', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies (if needed)
};

app.use(cors(corsOptions))
connectToDB();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cookieParser());


app.use("/user",userRoutes);
app.use("/captain",captainRoutes)
app.use("/maps",mapRoutes);
app.use("/rides",rideRoutes)

module.exports=app