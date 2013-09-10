var express = require('express'),
	http    = require('http'),
	path    = require('path'),
	routes  = require('./routes');
	cx      = require('concurixjs')();
	app     = express();

cx.start();


app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res){
	res.send("twitter or instagram?");
});
app.get('/instagram/:tag', routes.insta);
app.listen(5000, function(){
	console.log("Listening on 5000");
});