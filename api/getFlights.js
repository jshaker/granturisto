import http from 'http';

export default function({originIATA,destinationIATA}){
  return new Promise(function(resolve,reject){
    var req = http.get(`http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/ca/cad/en-US/${originIATA}/${destinationIATA}/anytime/anytime?apikey=prtl6749387986743898559646983194`, function(response){
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
        if(parsed.Quotes){
          resolve(parsed.Quotes.sort(function(a,b){
            return a.MinPrice - b.MinPrice;
          }).slice(0,10));
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

