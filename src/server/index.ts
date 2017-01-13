import express from 'express';
import {MongoClient} from 'mongodb';

var app = express();

//app.get('/', (req, res) => res.send('hello angelo!'));

console.log('starting server');

app.use(express.static('dist/public'));


const MONGO_URL = 'mongodb://localhost:27017/relay',
	PORT = 3000;

var db;
MongoClient.connect(MONGO_URL, (err, database) => {
	if(err) throw err;

	db = database;
	app.listen(PORT, () => console.log('Listening on port ' + PORT));
});


app.get('/data/links', (req, res) => {
	
	db.collection('links').find({}).toArray((err, links)=>{
		if(err) throw err;

		res.json(links);
	});
});
