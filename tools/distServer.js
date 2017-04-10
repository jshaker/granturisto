/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import compression from 'compression';
import getPlaces from '../api/getPlaces';
import getTrip from '../api/getTrip';

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/getPlaces', getPlaces);

app.post('/getTrip', getTrip);

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
