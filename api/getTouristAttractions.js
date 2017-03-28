import https from 'https';

export default function({destinationLatitude,destinationLongitude}){
  return new Promise(function(resolve,reject){
    var req = https.get(`http://www.tixik.com/api/nearby?lat=${destinationLatitude}&lng=${destinationLongitude}&limit=20&key=demo`, function(response){
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
        resolve(parsed.results[0]);
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });


};
