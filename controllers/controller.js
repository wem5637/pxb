var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

//connect to the database
mongoose.connect('mongodb://test:test@ds149049.mlab.com:49049/pxb', {
	server: {
	socketOptions: {
		socketTimeoutMS: 0,
		connectionTimeout: 60000
		}
	}
});

//create a schema - like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var data = [];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  var z = 0;
  app.get('/', function(req, res){
    //get data from mongodb and pass it to the view
    if (req.url !== "/favicon.ico") {
    z++;
    console.log(req.connection.remoteAddress + " || "+z+" views");
    }
    Todo.find({}, function(err, data){
        res.render('postit', {todos: data});
    });


  });

  app.get('/pxb', function(req, res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function(err, data){
        res.render('postit', {todos: data});
    });


  });


  app.get('/msvis', function(req, res){
    res.sendFile('/root/Post-its/views/mp.html');
  });

  app.get('/fbubb', function(req, res){
    res.sendFile('/root/Post-its/views/fb.html');
  });

  app.get('/about', function(req, res){
    res.sendFile('/root/Post-its/views/about.html');
  });

app.post('/', urlencodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err){
    if (err) throw err;
  });
  res.json(data);
});


app.delete('/:item', function(req, res){
  //delete the item from mongodb
  console.log(req.params.item);
Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
  if (err) throw err;
  res.json(data);
});

});


};
