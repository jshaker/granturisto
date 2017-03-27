import https from 'https';

export default function(req,res){
  const search = encodeURIComponent(req.query.search);
  var options = {
    host: `www.air-port-codes.com`,
    path: `/api/v1/autocomplete?term=${search}`,
    headers: {
      "APC-Auth": "2131d6167b",
      "APC-Auth-Secret": "38342299a3336f0",
      "accept": "application/json",
      "Content-Type": "application/json"
    }
  };

  https.get(options, function(response){
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      if(!parsed.airports){
        res.send([]);
      }
      else{
        res.send(parsed.airports);
      }
    });
  });
};
