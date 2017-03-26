import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';

export default function(req,res){
  let response = {};
  const {latitude, longitude} = req.body.userLocation;
  const nearestAirportReq = {latitude, longitude};
  getNearestAirport(nearestAirportReq).then(function(nearestAirport){
    const directionsReq = {userLatitude: latitude,userLongitude: longitude, airportLatitude: nearestAirport.geometry.location.lat, airportLongitude: nearestAirport.geometry.location.lng};
    getDirectionsToAirport(directionsReq).then(function(airportDirections){
      response.airportDirections = airportDirections;
      res.send(response);
    });
  });
};
