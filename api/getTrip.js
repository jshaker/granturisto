import getNearestAirport from './getNearestAirport';
import getDirectionsToAirport from './getDirectionsToAirport';
import getDestination from './getDestination';
import getFlights from './getFlights';

export default function (req, res) {
  const {latitude, longitude} = req.body.userLocation;
  const nearestAirportReq = {latitude, longitude};
  const {destinationPlace} = req.body.destination;

  let originPromise = getNearestAirport(nearestAirportReq).then(function (nearestAirport) {

    let directionsReq = {
      userLatitude: latitude,
      userLongitude: longitude,
      airportLatitude: nearestAirport.geometry.location.lat,
      airportLongitude: nearestAirport.geometry.location.lng
    };

    return getDirectionsToAirport(directionsReq).then(function (airportDirections) {
      return {
        location: {
          latitude: directionsReq.userLatitude,
          longitude: directionsReq.userLongitude
        },
        airport: {
          name: nearestAirport.name,
          location: {
            latitude: directionsReq.airportLatitude,
            longitude: directionsReq.airportLongitude
          },
          routes: airportDirections
        }
      };
    });
  });

  // let destinationPromise = getDestination(req.body.destination).then(function (destination) {
  //   let nearestAirportReq = {
  //     latitude: destination.geometry.location.lat,
  //     longitude: destination.geometry.location.lng
  //   };
  //
  //   return getNearestAirport(nearestAirportReq).then(function (nearestAirport) {
  //     return {
  //       name: destination.name,
  //       location: {
  //         latitude: nearestAirportReq.latitude,
  //         longitude: nearestAirportReq.longitude,
  //       },
  //       airport: {
  //         location: {
  //           latitude: nearestAirport.geometry.location.lat,
  //           longitude: nearestAirport.geometry.location.lng
  //         },
  //         name: nearestAirport.name
  //       }
  //     };
  //   });
  // });

  Promise.all([originPromise]).then((results) => {
    let result = {
      origin: results[0],
      destination: results[1]
    };

    console.log(result);
    res.send(result);
  });
}
