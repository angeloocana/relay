import express from 'express';

let app = express();

//app.get('/', (req, res) => res.send('hello angelo!'));

app.use(express.static('public'));

app.listen(3000);
