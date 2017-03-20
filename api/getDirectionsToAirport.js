import http from 'http';

export default function(req,res){
  console.log("User location:");
  console.log(req.query.userLat);
  console.log(req.query.userLong);
  console.log("Airport location:");
  console.log(req.query.airportLat);
  console.log(req.query.airportLong);

  http.get(`http://free.rome2rio.com/api/1.4/json/Search?key=aHIsdxZq&oPos=${req.query.userLat},${req.query.userLong}&dPos=${req.query.airportLat},${req.query.airportLong}`, function(response){

    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      res.send(parsed);
    });
  });
};

