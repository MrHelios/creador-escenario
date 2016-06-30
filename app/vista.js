var miframe = require('../miFrame/template.js');
var modelo = require('./modelo.js');


index = function(request, response) {
  // Boludear con el GET o POST
  if(request.method == 'GET') {
    // Hacer algo, bro.
  };
  miframe.render(__dirname + '/static/index.html', response);
}


mas = function(request, response) {
  // Boludear con el GET o POST
  miframe.render(__dirname + '/static/mas.html', response);
}

module.exports.index = index;
module.exports.mas = mas;
