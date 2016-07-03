var miframe = require('../miFrame/template.js');
var vista = require('./modelo.js');

index = function(request, response) {
  vista.tabla_archivos.buscarTODO('',[miframe.render, __dirname + '/static/index.html', response, {'templates': '{{templates}}'}]);
}

creador = function(request, response) {
  if(request.method == 'GET') {
    response.write('Lo sentimos, pero a esta pagina no puedes acceder. :-)');
    response.end();
  }
  else if(request.method == 'POST') {
    var dicc = {};
    request.on('data', function(chunk) {
      dicc = creadorPOST(chunk);

      vista.tabla_archivos.buscar(' WHERE nombre= ' + dicc.archivo , vista.tabla_archivos.insertar({'nombre': dicc.archivo}));
      miframe.render(__dirname + '/static/creador.html', response, {'archivo': '{{nombre}}','long': '{{longitud}}','altura':'{{altura}}'}, dicc);
    })
  }
}

var creadorPOST = function(chunk) {
  var dicc = {};

  var s = chunk.toString().split('&')
  for(var i=0; i<s.length;i++) {
    var s2 = s[i].split('=');
    dicc[s2[0]] = s2[1];
  }
  dicc.archivo = "'"+ dicc.archivo +"'"
  return dicc;
}

module.exports.index = index;
module.exports.creador = creador;
