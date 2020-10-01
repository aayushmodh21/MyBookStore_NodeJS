// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').parse();
// }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');


app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

mongoose.connect('mongodb://localhost:27017/mybrary', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorRouter)


app.listen(process.env.PORT || 3000);
