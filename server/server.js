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
var LocalDbUrl = 'mongodb://localhost:27017/test';
var jwtCheck = jwt({
  secret: new Buffer(auth0Settings.secret, 'base64'),
  audience: auth0Settings.audience
});



var db;
var responseToSender = [];
var responseToProvider = [];

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
    assignProvider(req.body, (responseToProvider) => {
      console.log(responseToProvider);
    res.send(JSON.stringify(responseToProvider));
    });
  })
});

app.use('/order-confirm', jwtCheck);
app.post('/order-confirm', (req, res) => {
  db.collection('parcelSender').save(req.body, (err, result) => {
  if (err) return console.log(err)
    assignSender(req.body, (responseToSender) => {
      console.log(responseToSender);
      res.send(JSON.stringify(responseToSender));
    });
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

// var data = {
//   "_id": {
//     "$oid": "5765f26cbfc8e0bd94e0a5d0"
//   },
//   "name": "Abhilash Shrivastava",
//   "phone": "2485679221",
//   "currentAddreddaddressLine1": "50 Chumasero Drive",
//   "currentCity": "San Francisco",
//   "currentState": "CA",
//   "currentZip": 94132,
//   "email": "provider@provider.com",
//   "destinationAddreddaddressLine1": "19th ",
//   "destinationCity": "Hillsboro",
//   "destinationState": "OR",
//   "destinationZip": 12345,
//   "journeyDate": "2016-06-24",
//   "availabilityFrom": "20:00",
//   "availabilityTo": "22:00",
//   "maxParcelWeight": 50,
//   "maxParcelHeight": 70,
//   "maxParcelLength": 70,
//   "maxParcelWidth": 70
// };


MongoClient.connect(LocalDbUrl, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(9000, () => {
    console.log('listening on 9000');
  })
})

app.use('/user-profile', jwtCheck);

app.get('/user-profile', function (req, res) {
  request(data, (requests) => {
    console.log(requests);
    res.send(JSON.stringify(requests));
})
});

var assignProvider =  function (data, callback) {
  var cursorone = db.collection('parcelSender').find( { "deliveryCity": data.destinationCity, "parcelWeight": { $lte: (data.maxParcelWeight) }, "parcelHeight": { $lte: (data.maxParcelHeight)}, "parcelLength": { $lte: (data.maxParcelLength)}, "parcelWidth": { $lte: (data.maxParcelWidth)}} ).sort({parcelWeight: -1}).limit(1);
  cursorone.each(function(err, sender){
    if (sender != null){
      if (!sender["providerEmail"]){
        sender["providerEmail"] = data.email;
        sender["status"] = "Assigned";
      }
      db.collection('providerAssigned').save(sender, (err, result) => {
        if (err) return console.log(err);
        db.collection('parcelSender').deleteOne(
        { "_id": sender._id },
        function(err, results) {
          data.maxParcelWeight -= sender.parcelWeight;
          data.maxParcelHeight -= sender.parcelHeight;
          data.maxParcelLength -= sender.parcelLength;
          data.maxParcelWidth -= sender.parcelWidth;
          responseToProvider.push(sender);
          console.log('saved to database');
          cursorone.close();
          db.collection('parcelSender').find( { "deliveryCity": data.destinationCity, "parcelWeight": { $lt: (data.maxParcelWeight +1) }, "parcelHeight": { $lt: (data.maxParcelHeight + 1)}, "parcelLength": { $lt: (data.maxParcelLength + 1)}, "parcelWidth": { $lt: (data.maxParcelWidth + 1)}} ).count(function (e, count) {
            if (count == 0){
              callback(sender);
            }else {
              assignProvider(data, callback);
            }
          });
        }
      );
    })
    }
  })
};


var assignSender =  function (data, callback) {
  var cursorone = db.collection('serviceProvider').find( { "destinationCity": data.deliveryCity, "maxParcelWeight": { $gte: (data.parcelWeight) }, "maxParcelHeight": { $gte: (data.parcelHeight)}, "maxParcelLength": { $gte: (data.parcelLength)}, "maxParcelWidth": { $gte: (data.parcelWidth)}, "journeyDate" : { $gt: new Date(new Date()).toISOString().split('T')[0] } } ).sort({maxParcelWeight: + 1}).limit(1);
  cursorone.each(function(err, provider){
    if (provider != null){
      if (!data["providerEmail"]){
        data["providerEmail"] = provider.email;
        data["status"] = "Assigned";
      }
      db.collection('providerAssigned').save(data, (err, result) => {
        if (err) return console.log(err);
      responseToSender.push(provider);
      callback(responseToSender);
      cursorone.close();
      provider.maxParcelWeight -= data.parcelWeight;
      provider.maxParcelHeight -= data.parcelHeight;
      provider.maxParcelLength -= data.parcelLength;
      provider.maxParcelWidth -= data.parcelWidth;
        if ((provider.maxParcelWeight < 1) || (provider.maxParcelHeight < 1) || (provider.maxParcelLength < 1) || (provider.maxParcelWidth < 1) ) {
          db.collection('serviceProvided').save( provider, function(err, results) {
            console.log('saved to database');
          });
        }else {
          db.collection('serviceProvider').updateOne(
            { "email" : provider.email },
            {
              $set: { "maxParcelWeight": provider.maxParcelWeight, "maxParcelHeight": provider.maxParcelHeight, "maxParcelLength": provider.maxParcelLength, "maxParcelWidth": provider.maxParcelWidth },
            }, function(err, results) {
              console.log('saved to database');
            });
        }
      })
    }
  })
};




var request = function (data, callback) {
  var requests = [];
  var cursor = db.collection('providerAssigned').find( { "providerEmail": data.email} );
  cursor.each(function(err, request){
    if (request != null) {
      requests.push(request);
      console.log(requests);
    }else {
      callback(requests)
    }
  })
}