var express = require('express');
var app = express();
var consign = require('consign');
var bodyParser = require('body-parser');



consign().include('/routes')
    .then('/models')
    .into(app);

//definindo o ejs como engine de views
app.set('view engine', 'ejs');
app.set('views', './views');

module.exports = app;