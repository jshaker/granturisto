import http from 'http';

export default function({userLatitude,userLongitude,airportLatitude,airportLongitude}){
  return new Promise(function(resolve,reject){
    var req = http.get(`http://free.rome2rio.com/api/1.4/json/Search?key=aHIsdxZq&oPos=${userLatitude},${userLongitude}&dPos=${airportLatitude},${airportLongitude}`, function(response){
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
        resolve(parsed);
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });
};

