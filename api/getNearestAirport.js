import https from 'https';

export default function(req,res){
  https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.userLocation.latitude},${req.body.userLocation.longitude}&radius=10000&rankby=prominence&type=airport&key=AIzaSyCp6lahESZxAp0LSXxyUrWXFy1KkGICDws`, function(response){

    var body = '';
    response.on('data', function(d) {
      body += d;
      console.log(body);
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      console.log(parsed.results[0].name);
      res.send(parsed.results[0]);
    });
  });
};
