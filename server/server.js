/**
 * Created by Abhi on 6/12/16.
 */
const express = require('express');
var cors = require('cors');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
app.use(cors());

var jwt = require('express-jwt');
var auth0Settings = require('./auth0.json');

var jwtCheck = jwt({
  secret: new Buffer(auth0Settings.secret, 'base64'),
  audience: auth0Settings.audience
});

app.use('/user-profile', jwtCheck);

app.get('/user-profile', function (req, res) {
  res.json("I will provide the user details");
});

var db;
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

response = {
  status: 'Saved'
}
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.use('/service-confirm', jwtCheck);
app.post('/service-confirm', (req, res) => {
  console.log(req.body);
  db.collection('serviceProvider').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database');
    res.send(JSON.stringify(response));
})
});

app.use('/order-confirm', jwtCheck);
app.post('/order-confirm', (req, res) => {
  console.log(req.body);
  db.collection('parcelSender').save(req.body, (err, result) => {
  if (err) return console.log(err)
  console.log('saved to database');
res.send(JSON.stringify(response));
})
});

MongoClient.connect('mongodb://abhilash.shrivastava:ab#ILASH0@ds019471.mlab.com:19471/meet-the-need-db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(9000, () => {
    console.log('listening on 9000')
  })
})