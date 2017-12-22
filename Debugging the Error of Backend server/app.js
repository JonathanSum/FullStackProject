var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator')
var api = express.Router();
var mongojs = require('mongojs')
var db =mongojs('customerapp', ['users'])
var ObjectId=mongojs.ObjectId;
var app = express();
// var logger = function(req, res, next){
//   console.log('Logging...');
//   next();
// }
//

// app.use(logger);
//View Engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Express Validator Middleware
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});
// Express Validator Middleware
app.use(expressValidator({
        errorFormater: function (param, msg, value) {
            var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;
            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            }
        }
}));


var users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Sum',
        email: 'SumJohnn@gmail.com',

    },
    {
        id: 2,
        first_name: 'Sam',
        last_name: 'Wong',
        email: '123WOng@gmail.com',

    },
    {
        id: 3,
        first_name: 'Mary',
        last_name: 'Dan',
        email: 'Mary@gmail.com',

    },
]
app.get('/', function (req, res) {
  db.users.find(function(err,docs){
    console.log(docs)
    res.render("index", {
        title: 'Customers',
        users: docs
    });
  })
    // res.send('Hello Everyone');

});
app.post('/users/add', function (req, res) {
    req.checkBody('last_name', 'last Name is Required').notEmpty();
    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('email', 'Email Name is Required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
                title: 'Customers',
                users: users,
                errors: errors
            },)
        console.log('ERRORS');
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email

        }
        db.users.insert(newUser,function(err,result){
                  console.log('call1')
          if(err){
            console.log(err);
          }
          res.redirect('/');
          })
        console.log('Data Here!')
    }
});

app.delete('/users/delete/:id', function(req, res){

  db.users.remove({_id:ObjectId(req.params.id)})

    })


// app.delete('/users/delete/:id', function(req, res){
//   db.users.remove({_id:ObjectId(req.params.id),function(err,result){
//             console.log('c2!')
//     if(err){
//       console.log(err);
//     }
//     res.redirect('/');
//   }
// })
// })
app.listen(3000, function () {
    console.log('Server Started on Port 3000...');
});
