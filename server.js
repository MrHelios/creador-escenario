var http = require('http');
var urls = require('./app/urls');
var u = require('./miFrame/url');
var modelo = require('./app/modelo');
//var tabla = require('./miFrame/db');

var app = http.createServer(function(request, response) {
  u.manejadorURL(request, response, urls);
});
app.listen(8080);

var io = require('socket.io')(app);

io.on('connection', function(socket){
  socket.on('guardar', function(data) {
    console.log(data);
    for(var i=0; i<data.length; i++) {
      if(data[i].accion == 'agregar') {
        if(data[i].tipo == 'linea') modelo.tabla_linea.insertar(organizar(data[i]));
        else modelo.tabla_rect.insertar(organizar(data[i]));
      }
      else if(data[i].accion == 'eliminar') {
        if(data[i].tipo == 'linea') modelo.tabla_linea.eliminar('xi='+ data[i].xi + ' AND yi='+ data[i].yi + ' AND xf='+ data[i].xf + ' AND yf='+ data[i].yf);
        else modelo.tabla_rect.eliminar('xi='+ data[i].xi + ' AND yi='+ data[i].yi + ' AND a='+ data[i].a + ' AND l='+ data[i].l);
      };
    }
    modelo.tabla_linea.mostrar();
    modelo.tabla_rect.mostrar();
  })
});

organizar = function(data) {
  var armado = [];

  if(data.tipo == 'linea') {
    armado.push('"archivo"');
    armado.push(data.xi);
    armado.push(data.yi);
    armado.push(data.xf);
    armado.push(data.yf);
  }
  else {
    armado.push('"archivo"');
    armado.push(data.xi);
    armado.push(data.yi);
    armado.push(data.a);
    armado.push(data.l);
  }
  return armado;
}
