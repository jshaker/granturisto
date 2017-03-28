import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';
import getNearestAirportIATA from './getNearestAirportIATA';
import getFlights from './getFlights';

export default function (req, res) {
  const {latitude, longitude} = req.body.userLocation;
  const nearestAirportReq = {latitude, longitude};
  const destinationIATA = req.body.destination.iata;

  let originPromise = getNearestAirport(nearestAirportReq).then(function (nearestAirport) {

    let directionsReq = {
      userLatitude: latitude,
      userLongitude: longitude,
      airportLatitude: nearestAirport.geometry.location.lat,
      airportLongitude: nearestAirport.geometry.location.lng
    };

    return getDirectionsToAirport(directionsReq).then(function (airportDirections) {
      return airportDirections
    });
  });

  let flightsPromise = getNearestAirportIATA(nearestAirportReq).then(function(originIATA){
    return getFlights({originIATA,destinationIATA});
  });

  Promise.all([originPromise,flightsPromise]).then((results) => {
    let result = {
      directions: results[0],
      flights: results[1]
    };
    console.log("result",result);
    res.send(result);
  });
}
