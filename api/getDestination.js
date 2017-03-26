import https from 'https';

export default function(place_id){
  return new Promise(function(resolve,reject){
    var req = https.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=AIzaSyCp6lahESZxAp0LSXxyUrWXFy1KkGICDws`, function(response){
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
        resolve(parsed.result);
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });
};
