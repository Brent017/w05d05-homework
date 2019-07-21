const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

require('./db/db');

const Car = require('./models/car')

const carController = require('./controller/cars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use('/cars', carController);

app.use((req, res, next) => {
	console.log('I run before every route');
	next();
});

app.listen(3000, () => {
	console.log("my server is listening for client requests");
});
