var miframe = require('../miFrame/template.js');
var vista = require('./modelo.js');

index = function(request, response) {
  vista.tabla_archivos.buscar('',[miframe.render, __dirname + '/static/index.html', response]);
}

creador = function(request, response) {
  if(request.method == 'GET') {
    response.write('Lo sentimos, pero a esta pagina no puedes acceder. :-)');
    response.end();
  }
  else if(request.method == 'POST') miframe.render(__dirname + '/static/creador.html', response);
}

module.exports.index = index;
module.exports.creador = creador;
