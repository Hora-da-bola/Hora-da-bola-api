var express = require('express');

var consign = require('consign');

var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
const mongoose = require('mongoose');
var fs = require('fs');

const PORT = 3000

mongoose.connect('mongodb://mongodb').then(()=>{
	console.log('#####################');
	console.log('connected to mongodb');
	console.log('#####################');
}).catch(err =>{
	console.log('#####################');
	console.log(err)
	console.log('#####################');
	process.exit(1)

})

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());
app.use(function(req,res,next){

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
})

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/controllers')
	.into(app);

module.exports = app;