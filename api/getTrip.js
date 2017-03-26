import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';
import getDestination from './getDestination';

export default function(req,res){
  let response = {};
  const {latitude, longitude} = req.body.userLocation;
  const nearestAirportReq = {latitude, longitude};
  getDestination(req.body.destination).then(function(destination) {
    const destinationReq = {lat: destination.geometry.location.lat, long: destination.geometry.location.lng, name: destination.name};
    response.destination = destinationReq;
    getNearestAirport(nearestAirportReq).then(function(nearestAirport){
      const directionsReq = {userLatitude: latitude,userLongitude: longitude, airportLatitude: nearestAirport.geometry.location.lat, airportLongitude: nearestAirport.geometry.location.lng};
      getDirectionsToAirport(directionsReq).then(function(airportDirections){
        response.airportDirections = airportDirections;
        res.send(response);
      });
    });
  });
}
