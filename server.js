'use strict';

console.log('Our first server');

// REQUIRE
// things we need to build a server
// in order to use something servers need to be told to require it and then use it. React does this in one step (import), Express needs two.

// to create a server we are bringin in Express
const express = require('express');

let data = require('./data/data.json');

// we need to bring in our .env file, so we'll use this after we have 
// npm i dotenv
require('dotenv').config();

// USE
// once we require something we need to use it.
// this is where assign the required file a name (variable)

// once we have express we must USE express
const app = express();

// define PORT & validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if my server is running on port 3002, I know there's a problem with my .env file or how I'm importing it or values in it

// ROUTES
// we need to declare our endpoints

// our basic default route:
// app.get corrolates to axios.get
// two arguments: the URL in quotes, and a callback function
// this gets called our "Slash route"
app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('/hello', (request, response) => {
  console.log(request.query.name);
  let firstName = request.query.name;
  let lastName = request.query.lastName
  response.send(`Hello ${firstName} ${lastName}!`);
});

app.get('/pets', (request, response) => {
  let speciesFromRequest = request.query.species;
  let selectedPet = data.find(pet => pet.species === speciesFromRequest);
  let dataToSend = new Pet(selectedPet);
  response.send(dataToSend);
});

// catch all "star route"
app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// ERRORS
// handle errors


// CLASSES
class Pet {
  constructor(petObject) {
    this.name = petObject.name;
    this.breed = petObject.breed;
  }
}


// LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
