
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
  res.connection.setTimeout(0);
assignProvider(req.body, (responseToProvider) => {
  console.log(responseToProvider);
res.send(JSON.stringify(responseToProvider));
});
});

app.use('/order-confirm', jwtCheck);
app.post('/order-confirm', (req, res) => {
  res.connection.setTimeout(0);
assignSender(req.body, (responseToSender) => {
  console.log(responseToSender);
res.send(JSON.stringify(responseToSender));
});
});

app.use('/save-user', jwtCheck);
app.post('/save-user', (req, res) => {
  db.collection('user').save(req.body, (err, result) => {
  res.connection.setTimeout(0);
if (err) return console.log(err)
console.log('saved to database');
res.send(JSON.stringify(response));
})
});


MongoClient.connect(LocalDbUrl, (err, database) => {
  if (err) return console.log(err)
  db = database
app.listen(9000, () => {
  console.log('listening on 9000');
})
})

app.use('/assigned-service-request', jwtCheck);

app.post('/assigned-service-request', function (req, res) {
  res.connection.setTimeout(0);
  assignedServiceRequest(req.body, (requests) => {
    console.log(requests);
  res.send(JSON.stringify(requests));
})
});

app.use('/unassigned-service-request', jwtCheck);

app.post('/unassigned-service-request', function (req, res) {
  res.connection.setTimeout(0);
  unassignedServiceRequest(req.body, (requests) => {
    res.send(JSON.stringify(requests));
})
});

app.use('/assigned-sender-request', jwtCheck);

app.post('/assigned-sender-request', function (req, res) {
  res.connection.setTimeout(0);
  assignedSenderRequest(req.body, (requests) => {
    res.send(JSON.stringify(requests));
})
});

app.use('/unassigned-sender-request', jwtCheck);

app.post('/unassigned-sender-request', function (req, res) {
  res.connection.setTimeout(0);
  unassignedSenderRequest(req.body, (requests) => {
    res.send(JSON.stringify(requests));
})
});


app.use('/parcel-receiving-request', jwtCheck);

app.post('/parcel-receiving-request', function (req, res) {
  res.connection.setTimeout(0);
  parcelReceivingRequest(req.body, (requests) => {
    res.send(JSON.stringify(requests));
})
});

app.use('/change-status', jwtCheck);

app.post('/change-status', function (req, res) {
  res.connection.setTimeout(0);
  parcelStatusChange(req.body, (requests) => {
    res.send(JSON.stringify(requests));
})
});

var assignProvider =  function (data, callback) {
  var cursorone = db.collection('parcelSender').find( { "deliveryCity": data.destinationCity, "parcelWeight": { $lte: (data.maxParcelWeight) }, "parcelHeight": { $lte: (data.maxParcelHeight)}, "parcelLength": { $lte: (data.maxParcelLength)}, "parcelWidth": { $lte: (data.maxParcelWidth)}} ).sort({parcelWeight: -1}).limit(1);
  cursorone.count(function (e, count) {

    if (count == 0){
      db.collection('serviceProvider').insertOne(data, (err, result) => {
        if (err) return console.log(err);
      console.log("saved to serviceProvider");
      return;
    })
    }
    else {
      cursorone.each(function(err, sender){
        if (sender !== null){
          if (!sender["serviceProvider"]){
            sender["serviceProvider"] = data;
            sender["status"] = "Assigned";
          }
          db.collection('providerAssigned').insertOne(sender, (err, result) => {
            if (err) return console.log(err);
          db.collection('parcelSender').deleteOne(
            { "_id": sender._id },
            function(err, results) {
              console.log('deleted from parcelSender');
              data.maxParcelWeight -= sender.parcelWeight;
              data.maxParcelHeight -= sender.parcelHeight;
              data.maxParcelLength -= sender.parcelLength;
              data.maxParcelWidth -= sender.parcelWidth;
              console.log(data);
              responseToProvider.push(sender);
              db.collection('serviceProvided').insertOne( data, function(err, results) {
                console.log('saved to serviceProvided');
                cursorone.close();
                db.collection('parcelSender').find( { "deliveryCity": data.destinationCity, "parcelWeight": { $lt: (data.maxParcelWeight +1) }, "parcelHeight": { $lt: (data.maxParcelHeight + 1)}, "parcelLength": { $lt: (data.maxParcelLength + 1)}, "parcelWidth": { $lt: (data.maxParcelWidth + 1)}} ).count(function (e, count) {
                  if (count == 0){
                    callback(responseToProvider);
                  }else {
                    assignProvider(data, callback);
                  }
                });
              });
            });
        })
        }
      });
    }
  })
};


var assignSender =  function (data, callback) {
  var cursorone = db.collection('serviceProvider').find( { "destinationCity": data.deliveryCity, "maxParcelWeight": { $gte: (data.parcelWeight) }, "maxParcelHeight": { $gte: (data.parcelHeight)}, "maxParcelLength": { $gte: (data.parcelLength)}, "maxParcelWidth": { $gte: (data.parcelWidth)}, "journeyDate" : { $gt: new Date(new Date()).toISOString().split('T')[0] } } ).sort({maxParcelWeight: + 1}).limit(1);

  cursorone.count(function (e, count) {

    if (count == 0){
      db.collection('parcelSender').insertOne(data, (err, result) => {
        if (err) return console.log(err);
      console.log("Saved in parcelSender");
      return
    })
    }
    else{
      cursorone.each(function(err, provider){
        if (provider !== null){
          if (!data["serviceProvider"]){
            data["serviceProvider"] = provider;
            data["status"] = "Assigned To Service Provider";
          }
          db.collection('providerAssigned').insertOne(data, (err, result) => {
            if (err) return console.log(err);
          responseToSender.push(provider);
          callback(responseToSender);
          responseToSender = [];
          cursorone.close();
          provider.maxParcelWeight -= data.parcelWeight;
          provider.maxParcelHeight -= data.parcelHeight;
          provider.maxParcelLength -= data.parcelLength;
          provider.maxParcelWidth -= data.parcelWidth;
          if ((provider.maxParcelWeight < 1) || (provider.maxParcelHeight < 1) || (provider.maxParcelLength < 1) || (provider.maxParcelWidth < 1) ) {
            db.collection('serviceProvider').deleteOne(
              { "_id": provider._id },
              function(err, results) {
                console.log("Deleted from serviceProvider");
                db.collection('serviceProvided').insertOne( provider, function(err, results) {
                  console.log('saved to serviceProvided');
                });
              });
          }else {
            db.collection('serviceProvider').updateOne(
              { "_id": provider._id },
              {
                $set: { "maxParcelWeight": provider.maxParcelWeight, "maxParcelHeight": provider.maxParcelHeight, "maxParcelLength": provider.maxParcelLength, "maxParcelWidth": provider.maxParcelWidth },
              }, function(err, results) {
                console.log('updated serviceProvider');
                db.collection('serviceProvided').insertOne( provider, function(err, results) {
                  console.log('saved to serviceProvided');
                });
              });
          }
        });
        }
      })
    }
  })
};




var assignedServiceRequest = function (data, callback) {
  var assignedServiceRequests = [];
  var cursor = db.collection('providerAssigned').find( { "serviceProvider.email": data.email} );
  cursor.each(function(err, request){
    if (request !== null) {
      assignedServiceRequests.push(request);
    }else {
      callback(assignedServiceRequests)
    }
  })
};

var unassignedServiceRequest = function (data, callback) {
  var unassignedServiceRequests = [];
  var cursor = db.collection('serviceProvider').find( { "email": data.email} );
  cursor.each(function(err, request){
    if (request !== null) {
      unassignedServiceRequests.push(request);
    }else {
      callback(unassignedServiceRequests)
    }
  })
};

var assignedSenderRequest = function (data, callback) {
  var assignedServiceRequests = [];
  var cursor = db.collection('providerAssigned').find( { "senderEmail": data.email} );
  cursor.each(function(err, request){
    if (request !== null) {
      assignedServiceRequests.push(request);
    }else {
      callback(assignedServiceRequests)
    }
  })
};

var unassignedSenderRequest = function (data, callback) {
  var unassignedServiceRequests = [];
  var cursor = db.collection('parcelSender').find( { "senderEmail": data.email} );
  cursor.each(function(err, request){
    if (request !== null) {
      unassignedServiceRequests.push(request);
    }else {
      callback(unassignedServiceRequests)
    }
  })
};


var parcelReceivingRequest = function (data, callback) {
  var parcelReceivingRequests = [];
  var cursor = db.collection('providerAssigned').find( { "receiverEmail": data.email} );
  cursor.each(function(err, request){
    if (request !== null) {
      parcelReceivingRequests.push(request);
    }else {
      callback(parcelReceivingRequests)
    }
  })
};

var parcelStatusChange = function (data, callback) {
  var cursor = db.collection('providerAssigned').find( { "_id": ObjectId(data.parcelId)} );
  cursor.each(function(err, parcel){
    if (parcel !== null) {
      if (parcel.senderEmail === data.email){
        role = "Sender";
        status = "Parcel Given To Service Provider"
      }else if (parcel.serviceProvider.email === data.email){
        role = "Provider";
        if (parcel.status === "Parcel Given To Service Provider"){
          status = "Parcel Collected From Sender"
        }else if (parcel.status === "Parcel Collected From Sender"){
          status = "Parcel Delivered To Receiver"
        }
      }else if (parcel.receiverEmail === data.email){
        role = "Receiver";
        status = "Parcel Received From Service Provider"
      }
      db.collection('providerAssigned').updateOne(
        { "_id": ObjectId(data.parcelId)},
        {
          $set: { "status": status },
        }, function(err, results) {
          console.log('status updated');
          callback({role: role, status: status});
        });
    }
  });
};