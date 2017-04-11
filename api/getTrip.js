import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';
import getNearestAirportIATA from './getNearestAirportIATA';
import getFlights from './getFlights';
import getTouristAttractions from './getTouristAttractions';
import getDestinationCoordinates from './getDestinationCoordinates';
import getDestinationWeather from './getDestinationWeather';
import getDestinationHotels from './getDestinationHotels';

export default function (req, res) {
  const departureIATA = req.body.departure.iata;
  const departureCity = req.body.departure.city;
  const destinationIATA = req.body.destination.iata;
  const destinationCity = req.body.destination.city;

  const originPromise = Promise.all([getDestinationCoordinates(departureCity),getDestinationCoordinates(departureCity+" "+departureIATA)]).then(function(results) {

    const directionsReq = {
      userLatitude: results[0][0].geometry.location.lat,
      userLongitude: results[0][0].geometry.location.lng,
      airportLatitude: results[1][0].geometry.location.lat,
      airportLongitude: results[1][0].geometry.location.lng
    };

    return getDirectionsToAirport(directionsReq);
  });

  const flightsPromise = getFlights({originIATA: departureIATA,destinationIATA});

  const touristAttractionsPromise = getTouristAttractions(destinationCity);

  const destinationWeatherPromise = getDestinationCoordinates(destinationCity).then(function (result) {
    const coordinates = {
      latitude: result[0].geometry.location.lat,
      longitude: result[0].geometry.location.lng
    };

    return getDestinationWeather(coordinates);
  });

  const destinationHotelPromise = getDestinationCoordinates(destinationCity).then(function (result) {
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

    res.send(result);
  });
}
