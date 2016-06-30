var fs = require('fs');

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

module.exports.render = render;
