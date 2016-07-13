var http = require('http');
var urls_app = require('./app/urls');
var urls_juego = require('./juego/urls');
var u = require('./miFrame/url');
var modelo = require('./app/modelo');
var vista = require('./app/vista');

urls = {};
for(k in urls_app.urls) {
  urls[k] = urls_app.urls[k];
}
for(k in urls_juego.urls) {
  urls[k] = urls_juego.urls[k];
}

var app = http.createServer(function(request, response) {
  u.manejadorURL(request, response, urls);
});
app.listen(8080);

var io = require('socket.io')(app);

io.on('connection', function(socket){
  // Guarda la informacion.
  // REVIDAR ESTO!!!!!
  var i=0;
  var encontrado=false;
  while(i<socket.request['rawHeaders'].length && !encontrado) {
    encontrado = socket.request['rawHeaders'][i];
    i++;
  }

  if(encontrado) {
    modelo.tabla_linea.agregar(" WHERE nombre="  + '"archivito"' , 'archivito-linea', socket);
    modelo.tabla_rect.agregar(" WHERE nombre="  + '"archivito"' , 'archivito-rect', socket);
  }

  socket.on('guardar', modelo.conexion_db);
});
