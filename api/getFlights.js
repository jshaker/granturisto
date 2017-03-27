import http from 'http';

export default function({destinationPlace}){
  return new Promise(function(resolve,reject){
    var req = http.get(`http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/ca/cad/en-US/yul/${destinationPlace}/anytime/anytime?apikey=prtl6749387986743898559646983194`, function(response){
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

