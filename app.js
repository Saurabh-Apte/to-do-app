var express = require('express');
var app = express();

var todoController = require('./controllers/todoController');

app.set('view engine','ejs');

//static file
app.use(express.static('./public'))


//fire the controller
todoController(app);

app.listen(3000);
console.log('You are listening to port 3000');
