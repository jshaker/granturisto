import https from 'https';

export default function(req,res){
  https.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.searchText}&&key=AIzaSyCp6lahESZxAp0LSXxyUrWXFy1KkGICDws`, function(response){

    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      res.send(parsed.predictions);
    });
  });
};
