var miframe = require('../miFrame/template.js');

serpiente = function(request, response) {
  miframe.render(miframe.direccion(__dirname, '/static/serpiente.html'), response);
}

module.exports.index = serpiente;
