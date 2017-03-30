import https from 'https';

export default function({latitude, longitude}){
  return new Promise(function(resolve,reject){
    var req = https.get(`https://api.darksky.net/forecast/38a0aa3246018f5e4a5b93b820c3c2c6/${latitude},${longitude}`, function(response){
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
