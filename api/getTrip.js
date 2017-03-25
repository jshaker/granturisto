import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';

export default function(req,res){
  const {latitude, longitude} = req.body.userLocation;
  const nearestAirportReq = {latitude, longitude};
  getNearestAirport(nearestAirportReq).then(function(nearestAirport){
    console.log("nearestAirport",nearestAirport);
    const directionsReq = {userLatitude: latitude,userLongitude: longitude, airportLatitude: nearestAirport.geometry.location.lat, airportLongitude: nearestAirport.geometry.location.lng};
    getDirectionsToAirport(directionsReq).then(function(airportDirections){
      console.log("airportDirections",airportDirections);
      res.send("test");
    });
  });
};
