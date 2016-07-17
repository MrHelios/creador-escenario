var miframe = require('../miFrame/template.js');
var modelo = require('./modelo.js');

index = function(request, response) {
  modelo.tabla_archivos.buscarTODO('',[miframe.render, miframe.direccion(__dirname, '/static/index.html'), response, {'templates': '{{templates}}'}]);
}

creador = function(request, response) {
  if(request.method == 'GET') {
    response.write('Lo sentimos, pero a esta pagina no puedes acceder. :-)');
    response.end();
  }
  else if(request.method == 'POST') {
    var dicc = {};
    request.on('data', function(chunk) {
      dicc = creador.prototype.POST(chunk);

      var nombre = ' WHERE nombre= ' + dicc.archivo;
      var tipo = dicc['tipo'];

      // render, direccion HTML, respuesta server, datos, dicc.
      if ((tipo=='creacion' && creador.prototype.esNumero(dicc['long']) && creador.prototype.esNumero(dicc['altura']) || tipo=='busqueda')) {
        var respuesta = [miframe, miframe.direccion(__dirname, '/static/creador.html'), response, {'archivo': '{{nombre}}','long': '{{longitud}}','altura':'{{altura}}','canvas-long':'{{canvas-long}}','canvas-alt':'{{canvas-alt}}'}, dicc];
        modelo.tabla_archivos.buscar(nombre, tipo, modelo.tabla_archivos, {'nombre': dicc.archivo}, respuesta);
      }
      else {
        response.write('Los datos suministrados han sido erroneos.');
        response.end();
      }
    });
  }
}

/*
  Verifica si es una busqueda o una creacion.
  Segun lo pedido retorna un diccionario.
*/
creador.prototype.POST = function(chunk) {
  var dicc = {};

  var s = chunk.toString().split('&')
  // Para el caso de busqueda solo hay un atributo.
  if(s.length == 1) {

    for(var i=0; i<s.length;i++) {
      var s2 = s[i].split('=');
      dicc[s2[0]] = s2[1];
    }
    // Nombre del escenario.
    dicc.archivo = "'"+ dicc.archivo +"'";
    // El tamaño del escenario.
    dicc['long'] = '400';
    dicc['altura'] = '400';
    // Esto por el momento esta como default.
    dicc['canvas-long'] = '1000';
    dicc['canvas-alt'] = '800';
    dicc['tipo'] = 'busqueda';
    return dicc;
  }
  // En el caso de creacion hay mas.
  else {

    for(var i=0; i<s.length;i++) {
      var s2 = s[i].split('=');
      dicc[s2[0]] = s2[1];
    }
    dicc.archivo = "'"+ dicc.archivo +"'";

    if(dicc['long'] < 1000) dicc['canvas-long'] = '1000';
    else dicc['canvas-long'] = dicc['long'];

    if(dicc['altura'] < 800) dicc['canvas-alt'] = '800';
    else dicc['canvas-alt'] = dicc['altura'];

    dicc['tipo'] = 'creacion';
    return dicc;
  }
}

/*
  Verifica si es un Entero.
*/
creador.prototype.esNumero = function (valor) {
  var x = parseFloat(valor);
  return !isNaN(valor) && (x | 0) === x;
}

module.exports.index = index;
module.exports.creador = creador;
