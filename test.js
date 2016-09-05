var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', function(req,res){
	res.type('text/plain');
	res.send('Meadowlark Travel-1');
});


var cb0 = function (req, res, next) {
  res.send('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}



app.get('/example/c', [cb0, cb1, cb2]);


app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
