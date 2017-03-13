import https from 'https';

export default function(req,res){
  console.log("userLocation",req.body.userLocation);
  console.log("destination",req.body.destination);
  res.send("test");
};
