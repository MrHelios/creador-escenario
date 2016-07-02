var template = require('./template');

var manejadorURL = function(request, response, urls) {
  // Para HTML
  if( request.url in urls.urls ) urls.urls[request.url](request, response);
  // Para otros archivos estaticos.
  else if(request.url.indexOf('.js') != -1 || request.url.indexOf('.css') != -1) {
    var dir = template.direccion(__dirname, request.url);

    if(request.url.indexOf('.js') != -1) template.render_otro(dir, response, request.url.indexOf('.js'));
    else if(request.url.indexOf('.css') != -1) template.render_otro(dir, response, request.url.indexOf('.css'));
  }
  else {
    response.writeHead(404);
    response.write('Esto esta muerto.');
    response.end();
  }
}

module.exports.manejadorURL = manejadorURL;
