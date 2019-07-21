const express = require('express');
const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
	make: String,
	model: String,
	year: Number,
	engine: String,
	horsepower: Number,
	convertible: Boolean,
	img: String
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;