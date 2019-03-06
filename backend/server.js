const express = require('express');
//const cors  = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const router = express.Router();

//app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/users');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection establiched successfully!');
});

// cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELET
E');

    next();
});

app.get('/', indexRouter);
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', usersRouter);

const port = 4000;
app.listen(port, () => console.log('Expresss running on port ' + port));
