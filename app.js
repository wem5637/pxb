var express = require('express');
var Controller = require('./controllers/controller');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));


//listen to port
app.listen(80, '0.0.0.0');
console.log('Server is up.');

//fire controllers
Controller(app);
