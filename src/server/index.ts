import express from 'express';

let app = express();

//app.get('/', (req, res) => res.send('hello angelo!'));

console.log('starting server');

app.use(express.static('dist/public'));

app.listen(3000);
