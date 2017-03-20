import https from 'https';

export default function(req,res){
  console.log(req.body.airport);

  https.get(`http://free.rome2rio.com/api/1.4/json/Search?key=aHIsdxZq&oPos=${req.body.userLocation.latitude},${req.body.userLocation.longitude}&dPos=${req.body.airport.geometry.location.lat},${req.body.airport.geometry.location.lng}`, function(response){

    var body = '';
    response.on('data', function(d) {
      body += d;
      console.log(body);
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      console.log(parsed);
      res.send(parsed);
    });
  });
};

