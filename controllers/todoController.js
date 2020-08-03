var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb+srv://saurabh:Saurabh_123@cluster0.01kgz.mongodb.net/rest?retryWrites=true&w=majority',{ useNewUrlParser: true } , ()=>{
    console.log('connected to DB!')
});

//Create a schema- like a blueprint
const todoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    
},()=>{
    console.log("im here")
});


var Todo = mongoose.model('todo-app', todoSchema);
var itemOne = Todo({item: 'exercise'}).save((err)=>{
    if (err) throw err;
    console.log('item saved');
    res.json(itemOne);
});
console.log(itemOne);

var data = [{item:'get milk'},{item:'walk dog'},{item:'coding'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = (app)=>{
    app.get('/todo', (req,res)=>{
        res.render('todo',{todos: data});

    });

    app.post('/todo',urlencodedParser, (req,res)=>{
        data.push(req.body);
        console.log(data);
        res.json(data);

    });

    app.delete('/todo/:item', (req,res)=>{
        data = data.filter((todo)=>{
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);

    });
}