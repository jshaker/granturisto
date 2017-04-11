import https from 'https';

export default function(req,res){
  const search = encodeURIComponent(req.query.search);
  var options = {
    host: `www.air-port-codes.com`,
    path: `/api/v1/autocomplete?term=${search}`,
    headers: {
      "APC-Auth": "6a784e1822",
      "APC-Auth-Secret": "fe1e493bce42670",
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
