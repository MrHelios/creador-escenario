var miframe = require('../miFrame/template.js');
var modelo = require('../app/modelo.js');

serpiente = function(request, response) {
  if(request.method == 'GET') {      
      miframe.render(miframe.direccion(__dirname, '/static/serpiente.html'), response);
  }
  else {
    response.write("Solo funciona con GET");
    response.end();
  }
}

module.exports.index = serpiente;
