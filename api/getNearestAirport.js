import https from 'https';

export default function({latitude,longitude}){
  return new Promise(function(resolve,reject){
    var req = https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=25000&rankby=prominence&type=airport&key=AIzaSyCp6lahESZxAp0LSXxyUrWXFy1KkGICDws`, function(response){
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
