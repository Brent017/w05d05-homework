const express = require('express');
const router = express.Router();
const Car = require('../models/car');


// Index.ejs
router.get('/', (req, res) => {
	// res.send('cars controller connected')
	Car.find({}, (err, cars) => {
		// console.log(cars, '<--array of objects index route');
		if(err){
			console.log(err);
		} else {
			res.render('index.ejs', {
				cars: cars
			});
		}
	});
});

// New
router.get('/new', (req, res) => {
	res.render('new.ejs')
});

// Create
router.post('/', (req, res) => {
	// console.log(req.body, '<--content of the form before if statement');
	if(req.body.covertible === 'on'){
		req.body.convertible = true;
	} else {
		req.body.convertible = false;
	}
	// console.log(req.body, "<--after if statement");
	Car.create(req.body, (err, createdCar) => {
		// console.log(createdCar, '<--post route /cars, createdCar');
		if(err){
			res.send(err);
		} else {
			res.redirect('/cars')
		}
	});
});

// Show.ejs
router.get('/:id', (req,res) => {
	console.log(req.params, "<--req.params");
	console.log('/cars/:id');
	Car.findById(req.params.id, (err, car) => {
		// console.log(car, 'inside of show route');
		if(err){
			res.send(err);
		} else {
			res.render('show.ejs', {
				car: car
			});
		}
	})
});

// Edit.ejs
router.get('/:id/edit', (req, res) => {
	Car.findById(req.params.id, (err, car) => {
		console.log(car, ':id/edit');
		if(err){
			console.log(err);
		} else {
			res.render('edit.ejs', {
				car: car
			})
		}
	})
});

// Update
router.put('/:id', (req, res) => {
	console.log(req.body, '<--req.body in put route');
	if(req.body.convertible === 'on'){
		req.body.convertible = true;
	} else {
		req.body.convertible = false;
	}
	Car.updateOne(
		{_id: req.params.id},
		req.body,
		(err, response) => {
			if(err){
				console.log(err);
			} else {
				// console.log(response, '<-- put route');
				res.redirect('/cars/' + req.params.id);
			}
		})
})

router.delete('/:id', (req, res) => {
	console.log(req.params, '<--req.params')
	Car.deleteOne({_id: req.params.id}, (err, response) => {
			if(err){
				console.log(err);
			} else {
				console.log(response, '<--delete');
				res.redirect('/cars');
			}
		})
})

module.exports = router;

