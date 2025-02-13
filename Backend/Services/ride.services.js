const rideModel=require('../models/ride.model');
const mapService=require('../Services/maps.services');
const crypto=require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
      throw new Error('pickup and destination are required');
    }
  
    // console.log(pickup, destination);
  
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // console.log(distanceTime);
  
    // Extracting numeric values from distance (e.g., '12.7 km' -> 12.7)
    const distance = parseFloat(distanceTime.distance.split(' ')[0]);
    
    // Extracting numeric values from duration (e.g., '31 mins' -> 31)
    const duration = parseFloat(distanceTime.time.split(' ')[0]);
  
    const baseFare = {
      auto: 30,
      car: 50,
      motorcycle: 20
    };
  
    const perKmRate = {
      auto: 10,
      car: 15,
      motorcycle: 8
    };
  
    const perMinuteRate = {
      auto: 2,
      car: 3,
      motorcycle: 1.5
    };
  
    // Now that distance and duration are numbers, calculate the fare
    const fare = {
      auto: Math.round(
        baseFare.auto +
          (distance * perKmRate.auto) +
          (duration * perMinuteRate.auto)
      ),
      car: Math.round(
        baseFare.car +
          (distance * perKmRate.car) +
          (duration * perMinuteRate.car)
      ),
      motorcycle: Math.round(
        baseFare.motorcycle +
          (distance * perKmRate.motorcycle) +
          (duration * perMinuteRate.motorcycle)
      )
    };
  
    // console.log(fare);
    return fare;
  }
  

module.exports.getFare=getFare


function getOTP(num) {
  function generateOTP(num) {
    const min = Math.pow(10, num - 1); // Minimum value, e.g., 1000 for 4 digits
    const max = Math.pow(10, num); // Maximum value, e.g., 10000 for 4 digits
    const otp = crypto.randomInt(min, max).toString(); // Generate OTP
    return otp;
  }
  return generateOTP(num);
}


module.exports.createRide=async({
    userId,pickup,destination,vehicleType
})=>{
  
    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }


    const fare=await getFare(pickup,destination);

    const ride=rideModel.create({
        userId:userId,
        pickup,
        destination,
        fare:fare[vehicleType],
        otp:getOTP(6)
    })


    return ride;
}

module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('rideId is required');
    }

   
    const updatedRide = await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'accepted', captain: captain._id },
        { new: true } 
    );

    
    // console.log("Updated Ride After Update:", updatedRide);

  
    const ride = await rideModel.findOne({
        _id: rideId
    })
    .populate('userId')      
    .populate('captain')    
    .select('otp')           
    

    // Log the fetched ride data
    // console.log("Fetched Ride:", ride);

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};


module.exports.startRide= async({rideId,otp,captain})=>{

  if(!rideId || !otp || !captain){
    throw new Error("rideId,otp and captain is required")
  }

  const ride=await rideModel.findOne({_id:rideId}).populate('userId').populate('captain').select('+otp')

  console.log(ride);

  if(!ride){
    throw new Error("Ride not found");
  }

  // if(ride.status!== 'accepted'){
  //   throw new Error('Ride not accepted');
  // }

  // if(ride.otp!==otp){
  //   throw new Error('Invalid OTP');
  // }

  await rideModel.findOneAndUpdate({_id:rideId},{
    status:'ongoing'
  })

  return ride;
}


module.exports.endRide= async({rideId,captain})=>{
  if(!rideId){
    throw new Error('Ride id is required');
  }

  const ride=await rideModel.findOne({_id:rideId,captain:captain._id}).populate('userId').populate('captain').select('+otp')

  if(!ride){
    throw new Error('Ride not found');
  }

  if(ride.status!== 'ongoing'){
    throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate({_id:rideId},{
    status:'completed'
  })

 return ride;
}
