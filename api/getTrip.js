import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';
import getNearestAirportIATA from './getNearestAirportIATA';
import getFlights from './getFlights';
import getTouristAttractions from './getTouristAttractions';
import getDestinationCoordinates from './getDestinationCoordinates';
import getDestinationWeather from './getDestinationWeather';
import getDestinationHotels from './getDestinationHotels';

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

  const destinationWeatherPromise = getDestinationCoordinates(city).then(function (result) {
    const coordinates = {
      latitude: result[0].geometry.location.lat,
      longitude: result[0].geometry.location.lng
    };

    return getDestinationWeather(coordinates);
  });

  const destinationHotelPromise = getDestinationCoordinates(city).then(function (result) {
    const coordinates = {
      latitude: result[0].geometry.location.lat,
      longitude: result[0].geometry.location.lng,
      searchRadius: 500 // May need to increase search radius. Can do multiple requests based on number of results.
    };

    return getDestinationHotels(coordinates);
  });

  Promise.all([originPromise, flightsPromise, touristAttractionsPromise, destinationWeatherPromise, destinationHotelPromise]).then((results) => {
    let result = {
      directions: results[0],
      flights: results[1],
      touristAttractions: results[2],
      weather: results[3],
      hotels: results[4]
    };

    console.log("result",result);
    res.send(result);
  });
}
