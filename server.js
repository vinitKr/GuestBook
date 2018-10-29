// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
// var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Guests = [
    {
        id: 1,
        name: 'Superman',
        email: 'superman@gmail.com',
        comment: ''
    },
    {
        id: 2,
        name: 'Batman',
        email: 'batman@gmail.com',
        comment: ''
    }
];

function paginate(page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return Guests.slice(page_number * page_size, (page_number + 1) * page_size);
}
function numberOfPages(){
    return Math.ceil(Guests.length/10);                
}

app.get('/api/guest/:pageNumber', function (req, res) {
    const pageNumber = req.params.pageNumber && (req.params.pageNumber <= 0)? 1: req.params.pageNumber;
    res.json({
        code: 200,
        message: '',
        total: Guests.length,
        numberOfPages: numberOfPages(), 
        data: paginate(10, pageNumber)
    });
})
app.post('/api/guest', function (req, res) {
    const id = Math.floor(1000 + Math.random() * 9000);
    if (req.body && req.body.email) {
        let guest = {
            id: id,
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment
        }
        Guests.push(guest);

        res.json({
            code: 200,
            message: 'Added Successfully!',
            data: Guests
        });
    } else {
        res.json({
            code: 500,
            message: 'Something went wrong!',
            data: []
        });
    }
})
app.delete('/api/guest/:id', function (req, res) {
    let id = req.params.id;
    let index = Guests.findIndex(it => it.id == id);
    Guests.splice(index, 1);
    res.json({
        code: 200,
        message: 'Deleted Successfully!',
        data: Guests
    });
})

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");