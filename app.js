const express = require('express'); //import express module
const { Mongoose } = require('mongoose');
const app = express(); //run express module and save in variable
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cheerio = require('cheerio');
const scraperapiClient = require('scraperapi-sdk')('d9e600fc58fcacdbccc251fb5929bfbe');
require('dotenv/config');

app.use(bodyParser.json()); //parses body response

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are home');
});

//Connect to DB
mongoose.connect(process.env.MONGODB_URL, () => 
console.log('connected to DB!')
);




 




app.listen(process.env.PORT || 8080, () => console.log('listening at 80')); //Take app var & configure listen port settings


