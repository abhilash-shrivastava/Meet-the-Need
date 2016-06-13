/**
 * Created by Abhi on 6/12/16.
 */
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;

var db;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.post('/service-confirm', (req, res) => {
  console.log(req.body);
  res.send('Hi');
});

MongoClient.connect('mongodb://abhilash.shrivastava:ab#ILASH0@ds019471.mlab.com:19471/meet-the-need-db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(9000, () => {
    console.log('listening on 9000')
  })
})