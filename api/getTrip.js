import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';
import getDestination from './getDestination';
import Q from 'q';

export default function(req,res){
  const {latitude, longitude} = req.body.userLocation;
  const nearestAirportReq = {latitude, longitude};

  let directionsPromise = getNearestAirport(nearestAirportReq).then(function(nearestAirport){

    const directionsReq = {
      userLatitude: latitude,
      userLongitude: longitude,
      airportLatitude: nearestAirport.geometry.location.lat,
      airportLongitude: nearestAirport.geometry.location.lng
    };

    return getDirectionsToAirport(directionsReq).then(function(airportDirections){
      directionsReq.routes = airportDirections;
      return directionsReq;
    });
  });

  let destinationPromise = getDestination(req.body.destination).then(function(destination) {
    const flightTicketReq = {
      latitude: destination.geometry.location.lat,
      longitude: destination.geometry.location.lng
    };

    return getNearestAirport(flightTicketReq).then(function(nearestAirport) {
      flightTicketReq.airport = {
        lat: nearestAirport.geometry.location.lat,
        lng: nearestAirport.geometry.location.lng,
        name: nearestAirport.name
      };
      return flightTicketReq;
    });
  });

  let result = Q.all([directionsPromise, destinationPromise]);

  result.spread(function (directions, destination) {
    console.log(directions);
    console.log(destination);

    let response = {};
    response.directions = directions;
    response.destination = destination;

    res.send(response);
  });
}
