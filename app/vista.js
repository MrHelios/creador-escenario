var miframe = require('../miFrame/template.js');

index = function(request, response) {
  miframe.render(__dirname + '/static/index.html', response);
}

creador = function(request, response) {
  // Boludear con el GET o POST
  miframe.render(__dirname + '/static/creador.html', response);
}

module.exports.index = index;
module.exports.creador = creador;
