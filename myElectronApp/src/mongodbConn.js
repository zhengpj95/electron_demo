const mongodb = require('mongodb');
const assert = require('assert');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://192.168.120.128:27017';

const client = new mongoClient(url, {useUnifiedTopology: true});
client.connect((err) => {
	assert.equal(null, err);
	console.log("Connected successfully to server");
})
let db = client.db('test');
db.collection('students').find({'name': 'zpj'}).toArray((err, docs) => {
	assert.equal(err, null);
	console.log(docs)
});

db.collection('students').findOne({'name': 'zpj'}, (err, docs) => {
	assert.equal(err, null);
	console.log(docs)
});
