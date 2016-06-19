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
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var DBurl = 'mongodb://abhilash.shrivastava:ab#ILASH0@ds019471.mlab.com:19471/meet-the-need-db';
var LocalDbUrl = 'mongodb://localhost:27017/test'
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
  db.collection('serviceProvider').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log(data);
    console.log('saved to database');
    //matchSender(req.body);
    res.send(JSON.stringify(response));
})
});

app.use('/order-confirm', jwtCheck);
app.post('/order-confirm', (req, res) => {
  db.collection('parcelSender').save(req.body, (err, result) => {
  if (err) return console.log(err)
  console.log('saved to database');
res.send(JSON.stringify(response));
})
});

app.use('/save-user', jwtCheck);
app.post('/save-user', (req, res) => {
db.collection('user').save(req.body, (err, result) => {
  if (err) return console.log(err)
  console.log('saved to database');
res.send(JSON.stringify(response));
})
});

var data = {
  "_id": {
    "$oid": "5765f26cbfc8e0bd94e0a5d0"
  },
  "name": "Abhilash Shrivastava",
  "phone": "2485679221",
  "currentAddreddaddressLine1": "50 Chumasero Drive",
  "currentCity": "San Francisco",
  "currentState": "CA",
  "currentZip": 94132,
  "email": "provider@provider.com",
  "destinationAddreddaddressLine1": "19th ",
  "destinationCity": "Hillsboro",
  "destinationState": "OR",
  "destinationZip": 12345,
  "journeyDate": "2016-06-24",
  "availabilityFrom": "20:00",
  "availabilityTo": "22:00",
  "maxParcelWeight": 50,
  "maxParcelHeight": 70,
  "maxParcelLength": 70,
  "maxParcelWidth": 70
};

MongoClient.connect(LocalDbUrl, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(9000, () => {
    console.log('listening on 9000');
    assignProvider(data);
})
})

var sender = [];
// var matchSender = function(data) {
//   var cursor =db.collection('parcelSender').find( { "deliveryCity": data.destinationCity, "parcelWeight": { $lt: data.maxParcelWeight}, "parcelHeight": { $lt: data.maxParcelHeight}, "parcelLength": { $lt: data.maxParcelLength}, "parcelWidth": { $lt: data.maxParcelWidth}, "serviceProvider": {$exists: false} } ).sort({parcelWeight: -1}).limit(1);
//   cursor.each(function(err, doc) {
//     assert.equal(err, null);
//     if (doc != null) {
//       db.collection('parcelSender').updateOne({"_id" : doc._id}, {$set: {"serviceProvider" : data.email }}).aggregate
//     }
//   });
// };

var assignProvider =  function (data, callback) {
  console.log(data);
  var cursor = db.collection('parcelSender').find( { "deliveryCity": data.destinationCity, "parcelWeight": { $lt: (data.maxParcelWeight +1) }, "parcelHeight": { $lt: (data.maxParcelHeight + 1)}, "parcelLength": { $lt: (data.maxParcelLength + 1)}, "parcelWidth": { $lt: (data.maxParcelWidth + 1)}} ).sort({parcelWeight: -1}).limit(1);
  cursor.each(function(err, sender){
    if (sender != null){
      console.log(sender);
      //console.log(data);
      //delete data["_id"];
      console.log(data);
      if (!sender["providerId"]){
        sender["providerId"] = data._id.$oid;
      }
      console.log(sender)
      db.collection('providerAssigned').save(sender, (err, result) => {
        if (err) return console.log(err);
        db.collection('parcelSender').deleteOne(
        { "_id": sender._id },
        function(err, results) {
          data.maxParcelWeight -= sender.parcelWeight;
          data.maxParcelHeight -= sender.parcelHeight;
          data.maxParcelLength -= sender.parcelLength;
          data.maxParcelWidth -= sender.parcelWidth;
          console.log(data);
          console.log('saved to database');
          cursor.close()
          assignProvider(data);
        }
      );
    })
    }
  })
}