var fs = require('fs');
var path = require('path');

// Para HTML
render = function(direccion, response, cambiar, adicional) {
  fs.readFile(direccion, function(err,data) {
    if(err) {
      console.log(err);
      response.end();
    }
    else {
      // Solo para index.
      if(adicional && 'templates' in cambiar) {
        for(k in cambiar) {
          data = Templates.prototype.agregarArchivo(data, cambiar[k], adicional);
        }
      }
      // Para creador.
      else {
        for(k in cambiar) {
          data = Templates.prototype.agregarArchivo(data, cambiar[k], adicional[k]);
        }
      }
      response.write(data);
      response.end();
    }
  })
}


// Para otro tipo. (CSS, JS, jpeg, json,etc)
render_otro = function(direccion, response, tipo) {
  fs.readFile(direccion, function(err,data) {
    if(err) {
      console.log(err);
      response.end(data);
    }
    else {
      if( tipo == '.js') {
        response.setHeader('content-type','text/javascript');
      }
      else if( tipo == '.css') {
        response.setHeader('content-type','text/css');
      }
      response.setHeader('content-length', data.length);
      response.statusCode = 200;
      response.end(data);
    }
  })
}

var direccion = function(abs,archivo) {
  return path.join(abs.substring(0,abs.lastIndexOf('/')), archivo);
}

function Templates() {
  // Nada por ahora.
}

Templates.prototype.agregarArchivo = function(data, palabra, reemplazar) {
  html = "" + data;

  if(typeof reemplazar == typeof "") {
    while(html.indexOf(palabra) != -1) html = html.replace(palabra, reemplazar);
  }
  else {
    var s = html.indexOf(palabra);
    for(var k in reemplazar) {
      html = html.substring(0,s) + reemplazar[k] + html.substring(s, html.length);
    }
    html = html.replace(palabra, '');
  }
  return html;
}

module.exports.render = render;
module.exports.render_otro = render_otro;
module.exports.direccion = direccion;
