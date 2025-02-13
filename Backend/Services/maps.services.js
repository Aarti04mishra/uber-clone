const axios = require('axios');
const CaptainModel=require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {
  try {
    // Your GoMaps API key
    const GOMAPS_API_KEY = process.env.GOMAPS_API_KEY;

    if (!GOMAPS_API_KEY) {
      throw new Error('GoMaps API key is not configured.');
    }

    // Encode the address to make it URL-safe
    const encodedAddress = encodeURIComponent(address);

    // Construct the API URL for GoMaps
    const apiUrl = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodedAddress}&key=${GOMAPS_API_KEY}`;

    // console.log('API URL:', apiUrl);

    // Make the request to the GoMaps Geocoding API
    const response = await axios.get(apiUrl);

    // console.log('API Response:', response.data); 

    // Check if the API response contains valid data
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;

      // Return the latitude and longitude as an object
      return {
        ltd: location.lat,
        lng: location.lng
      };
    } else {
      console.error('Geocoding API Error:', response.data);
      throw new Error(response.data.error_message || 'Could not fetch coordinates for the given address.');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};


module.exports.getDistanceTime = async (origin, destination) => {
  try {
    // Your Go Maps API Key from environment variables
    const GOMAPS_API_KEY = process.env.GOMAPS_API_KEY;

    if (!GOMAPS_API_KEY) {
      throw new Error("GoMaps API key is not configured.");
    }

    // Encode origin and destination for URL safety
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);

    // Go Maps API URL for Distance Matrix
    const apiUrl = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${GOMAPS_API_KEY}`;

    // Make the API request using Axios
    const response = await axios.get(apiUrl);

    // Check if API response is valid
    if (response.data.status === "OK" && response.data.rows.length > 0) {
      const elements = response.data.rows[0].elements[0];

      if (elements.status === "OK") {
        return {
          distance: elements.distance.text, // Example: "5 km"
          time: elements.duration.text, // Example: "10 mins"
        };
      } else {
        throw new Error(`Distance API Error: ${elements.status}`);
      }
    } else {
      console.error("API Response Error:", response.data);
      throw new Error(response.data.error_message || "Could not fetch distance data.");
    }
  } catch (error) {
    console.error("Error fetching distance & time:", error.message);
    throw error;
  }
};


module.exports.getAutoCompleteSuggestions = async (input) => {

  try {
    if (!input) {
      throw new Error('Input is required for autocomplete suggestions.');
    }
    // Your GoMaps API key
    const GOMAPS_API_KEY = process.env.GOMAPS_API_KEY;

    if (!GOMAPS_API_KEY) {
      throw new Error('GoMaps API key is not configured.');
    }

    // Encode the input to make it URL-safe
    const encodedInput = encodeURIComponent(input);

    // Construct the API URL for GoMaps Autocomplete API
    const apiUrl = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodedInput}&key=${GOMAPS_API_KEY}`;


    // Make the request to the GoMaps Autocomplete API
    const response = await axios.get(apiUrl);
    console.log(response);

    // Check if the API response contains valid predictions
    if (response.data.status === 'OK' && response.data.predictions.length > 0) {
      // Extract and return the predictions with secondary text and terms
      return response.data.predictions.map((prediction) => ({
        description: prediction.description, // Full address
        secondary_text:
          prediction.structured_formatting?.secondary_text || null, // Additional context (city/state)
        place_id: prediction.place_id, // Unique place ID
        terms: prediction.terms.map((term) => term.value), // Extract terms (city, state, etc.)
      }));
    } else {
      console.error('Autocomplete API Error:', response.data);
      throw new Error(
        response.data.error_message || 'No autocomplete suggestions found.'
      );
    }
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error.message);
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  try {
      // Convert radius to radians for MongoDB (Earth radius ≈ 6378 km)
      const radiusInRadians = radius / 6378; 

      // Find captains within the radius
      const captains = await CaptainModel.find({
          location: {
              $geoWithin: {
                  $centerSphere: [[ltd, lng], radiusInRadians]
              }
          }
      });

      return captains; // Return the list of captains
  } catch (error) {
      console.error("Error finding captains in radius:", error);
      throw new Error("Failed to find captains in the specified radius.");
  }
};

