var fs = require('fs');
var path = require('path');

// Para HTML
render = function(direccion, response) {
  fs.readFile(direccion, function(err,data) {
    if(err) {
      console.log(err);
      response.end();
    }
    else {
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
      if( tipo == '.js') response.setHeader('content-type','text/javascript');
      else if( tipo == '.css') response.setHeader('content-type','text/css');
      response.setHeader('content-length', data.length);
      response.statusCode = 200;
      response.end(data);
    }
  })
}

var direccion = function(abs,archivo) {
  return path.join(abs.substring(0,abs.lastIndexOf('/')), archivo);
}

module.exports.render = render;
module.exports.render_otro = render_otro;
module.exports.direccion = direccion;
