var miframe = require('../miFrame/template.js');
var vista = require('./modelo.js');

index = function(request, response) {
  console.log(__dirname + '/static/index.html');
  vista.tabla_archivos.buscarTODO('',[miframe.render, miframe.direccion(__dirname, '/static/index.html'), response, {'templates': '{{templates}}'}]);
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

      vista.tabla_archivos.buscar(' WHERE nombre= ' + dicc.archivo , vista.tabla_archivos, {'nombre': dicc.archivo});
      miframe.render(miframe.direccion(__dirname, '/static/creador.html'), response, {'archivo': '{{nombre}}','long': '{{longitud}}','altura':'{{altura}}','canvas-long':'{{canvas-long}}','canvas-alt':'{{canvas-alt}}'}, dicc);
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
  dicc.archivo = "'"+ dicc.archivo +"'";

  if(dicc['long'] < 1000) dicc['canvas-long'] = '1000';
  else dicc['canvas-long'] = dicc['long'];

  if(dicc['altura'] < 800) dicc['canvas-alt'] = '800';
  else dicc['canvas-alt'] = dicc['altura'];
  return dicc;
}

module.exports.index = index;
module.exports.creador = creador;
