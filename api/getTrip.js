import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';
import getNearestAirportIATA from './getNearestAirportIATA';
import getFlights from './getFlights';
import getTouristAttractions from './getTouristAttractions';

export default function (req, res) {
  const {latitude, longitude} = req.body.userLocation;
  const nearestAirportReq = {latitude, longitude};
  const destinationIATA = req.body.destination.iata;
  const {city} = req.body.destination;

  const originPromise = getNearestAirport(nearestAirportReq).then(function (nearestAirport) {

    const directionsReq = {
      userLatitude: latitude,
      userLongitude: longitude,
      airportLatitude: nearestAirport.geometry.location.lat,
      airportLongitude: nearestAirport.geometry.location.lng
    };

    return getDirectionsToAirport(directionsReq);
  });

  const flightsPromise = getNearestAirportIATA(nearestAirportReq).then(function(originIATA){
    return getFlights({originIATA,destinationIATA});
  });

  const touristAttractionsPromise = getTouristAttractions(city);

  Promise.all([originPromise,flightsPromise,touristAttractionsPromise]).then((results) => {
    let result = {
      directions: results[0],
      flights: results[1],
      touristAttractions: results[2]
    };
    console.log("result",result);
    res.send(result);
  });
}
