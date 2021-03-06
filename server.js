var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db = require('./db');
var ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var artists = [
	{
		id: 1,
		name: "Metallica"
	},
	{
		id: 2,
		name: "Iron Maiden"
	},
	{
		id: 3,
		name: "Deep Purple"
	}
];

app.get('/', function(req, res){
	res.send('Hello API');
});

app.get('/artists', function(req, res){
	db.get().collection('artists').find().toArray(function(err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
});

app.post('/artists', function(req, res){
	var artist = {
		name: req.body.name
	}
	db.get().collection('artists').insert(artist, function(err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(artist);
	});
});

app.put('/artists/:id', function(req, res) {
	db.get().collection('artists').update(
		{ _id: ObjectID(req.params.id) },
		{ $set: { name: req.body.name } },
		{
			upsert: false,
			multi: false
		},
		function (err, result) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		}
	);
});

app.delete('/artists/:id', function(req, res) {
	db.get().collection('artists').deleteOne(
		{ _id: ObjectID(req.params.id) },
		function (err, result) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		}
	);
});

app.get('/artists/:id', function(req, res){
	db.get().collection('artists').findOne({ _id: ObjectID(req.params.id) }, function(err, doc){
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(doc);
	});
});

db.connect('mongodb://localhost:27017/', function(err, database) {
	if (err) return console.log(err);
	app.listen(3012, function(){
		console.log('API app started');
	});
});