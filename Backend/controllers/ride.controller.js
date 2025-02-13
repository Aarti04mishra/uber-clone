const rideServices = require('../Services/ride.services');
const { validationResult } = require("express-validator");
const mapServices = require('../Services/maps.services');
const { sendMessageToSocketId } = require('../socket');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // Create a new ride
        let ride = await rideServices.createRide({
            userId: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        // Populate the user field
        ride = await ride.populate('userId'); 

        const pickupCoordinates = await mapServices.getAddressCoordinate(pickup);

        // console.log(pickupCoordinates);
        if (!pickupCoordinates || isNaN(pickupCoordinates.ltd) || isNaN(pickupCoordinates.lng)) {
            return res.status(400).json({ message: "Invalid pickup coordinates" });
        }

        const captainInRadius = await mapServices.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            2
        );

        

        const rideDataToSend = { ...ride.toObject(), otp: undefined };

        // console.log(rideDataToSend);

        await Promise.all(
            captainInRadius.map(captain =>
                sendMessageToSocketId(captain.socketID, {
                    event: 'new-ride',
                    data: rideDataToSend
                })
            )
        );

        return res.status(201).json(ride);

    } catch (error) {
        console.error("Error in createRide:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

   console.log(req.query);
    

    try {
        const fare = await rideServices.getFare(pickup, destination);
        return res.status(200).json(fare);

    } catch (err) {
        console.error("Error in getFare:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.confirmRide= async(req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {rideId}=req.body;

    try{
        const ride=await rideServices.confirmRide({rideId,captain:req.captain});
        
        // console.log("rideeeeee:",ride);

        sendMessageToSocketId(ride.userId.socketID,{
             event:'ride-confirmed',
             data:ride
        })

        return res.status(200).json(ride)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.startRide= async(req,res,next)=>{


    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {rideId,otp}=req.query;

    

    const ride= await rideServices.startRide({rideId,otp,captain:req.captain})
   

    try{
        const ride= await rideServices.startRide({rideId,otp,captain:req.captain})

        
         
        sendMessageToSocketId(ride.userId.socketID,{
            event:'ride-started',
            data:ride
          });

          return res.status(200).json(ride);


    }catch(err){
        return res.status(500).json({message:err.message})
    }
}


module.exports.endRide= async(req,res,next)=>{
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

   const {rideId}=req.body;

   try{
    const ride= await rideServices.endRide({rideId,captain:req.captain});

    sendMessageToSocketId(ride.userId.socketID,{
        event:'ride-ended',
        data:ride
      });

      return res.status(200).json(ride);

   }catch(err){
    return res.status(500).json({message:err.message})
   }
}