
var manejadorURL = function(request, response, urls) {
  if( request.url in urls.urls ) urls.urls[request.url](request, response);
  else {
    response.writeHead(404);
    response.write('Esto esta muerto.');
    response.end();
  }
}

module.exports.manejadorURL = manejadorURL;
