import https from 'https';

export default function({latitude, longitude, searchRadius}){
  return new Promise(function(resolve, reject){
    var req = https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius}&type=lodging&key=AIzaSyAKxSKAlYPSewFcOkVRN5xTsBZcn_DUyyI`, function(response){
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
