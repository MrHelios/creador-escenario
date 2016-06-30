var http = require('http');
var urls = require('./app/urls');
var u = require('./miFrame/url');

var app = http.createServer(function(request, response) {
  u.manejadorURL(request, response, urls);
});
app.listen(8080);

var io = require('socket.io')(app);

io.on('connection', function(socket){
  // Por ahora nada.  
});
