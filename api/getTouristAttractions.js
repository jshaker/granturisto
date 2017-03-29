import https from 'https';

export default function(city){
  return new Promise(function(resolve,reject){
    var req = https.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}+point+of+interest&language=en&key=AIzaSyCp6lahESZxAp0LSXxyUrWXFy1KkGICDws`, function(response){
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
        resolve(parsed.results);
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });


};
