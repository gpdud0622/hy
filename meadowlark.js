var express = require('express');
var app = express();
//핸들바 뷰 엔진 설정
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app
.engine('handlebars', handlebars.engine)
.set('view engine', 'handlebars')
.set('port', process.env.PORT || 3000)
.use(express.static(__dirname + '/public'));

var fortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];

app
.get('/', function(req,res){
	res.render('home');
})

.get('/about', function(req,res){
	var randomFortune = 
		fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
	res.render('about', { fortune: randomFortune });
});
// 404 catch-all handler (middleware)
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - not found');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - server error');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
