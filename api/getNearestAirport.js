import https from 'https';

export default function(req,res){
  console.log("finding nearest airports using user location:");
  console.log(req.query.lat);
  console.log(req.query.long);
  https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.long}&radius=25000&rankby=prominence&type=airport&key=AIzaSyCp6lahESZxAp0LSXxyUrWXFy1KkGICDws`, function(response){

    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      console.log("Nearest Airport:");
      console.log(parsed.results[0].name);
      res.send(parsed.results[0]);
    });
  });
};
