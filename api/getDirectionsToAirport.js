import https from 'https';

export default function({userLatitude,userLongitude,airportLatitude,airportLongitude}){
  return new Promise(function(resolve,reject){
    var req = https.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${airportLatitude},${airportLongitude}&key=AIzaSyCYD-XqbdWlH7HhQs1-DvgG3KTvS8faZ6E`, function(response){
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        var parsed;
        try{
          parsed = JSON.parse(body);
        }
        catch(e){
          reject(e);
        }
        if(parsed.routes && parsed.routes.length > 0 && parsed.routes[0].legs && parsed.routes[0].legs.length > 0 && parsed.routes[0].legs[0].steps){
          resolve(parsed.routes[0].legs[0].steps);
        }
        else{
          resolve([]);
        }
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });
};

