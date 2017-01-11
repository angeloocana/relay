import express from 'express';
let app = express();
console.log('starting server');
app.use(express.static('dist/public'));
app.listen(3000);
