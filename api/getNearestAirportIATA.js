import http from 'http';

export default function({latitude,longitude}){
  return new Promise(function(resolve,reject){
    var req = http.get(`http://iatacodes.org/api/v6/nearby?api_key=f9fc3421-477e-4b0b-ba2a-0d739b275c6c&lat=${latitude}&lng=${longitude}`, function(response){
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
        resolve(parsed.response[0].code);
      });
    });
    req.on('error', function(err) {
      reject(err);
    });
    req.end();
  });


};
