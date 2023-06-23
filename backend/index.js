// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));




const connetToMongo= require("./db");// here import the funciton form the database file 
const express = require('express');// we also import express 
const cors = require('cors');// we also import cors so that we can fetch data
connetToMongo();// using the connectToMongo funciton 
const app = express() // using the express() as the app 
const port = 5000
app.use(cors());
app.use(express.json())// using the middleware inorder to convert the json sent in the header of the request 

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
  console.log(`The Example app live at http://localhost:${port}`);
});
