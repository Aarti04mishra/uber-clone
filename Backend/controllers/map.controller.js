const mapService = require('../Services/maps.services');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { address } = req.query;

   if (!address) {
      return res.status(400).json({ message: 'Address is required' });
   }

   try {
      const coordinates = await mapService.getAddressCoordinate(address);
      res.status(200).json(coordinates);
   } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
   }
};

module.exports.getDistanceTime= async(req,res,next)=>{

   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }

  const {origin,destination}=req.query;
  try{
   const distanceTime= await mapService.getDistanceTime(origin,destination);
   res.status(200).json(distanceTime);

  }
  catch(error){

   res.status(500).json({message:'Internal Server Error:',error:error.message});

  }
}

module.exports.getAutoCompleteSuggestions= async(req,res,next)=>{
 
   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }

   const {input}=req.query;
   try{
      const suggestion=await mapService.getAutoCompleteSuggestions(input);
      res.status(200).json(suggestion)

   }catch(error){

      res.status(500).json({message:'Internal Server Error:',error:error.message});
   }

}