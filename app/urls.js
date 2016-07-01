var vista = require('./vista.js');

var urls = {
  '/': vista.index,
  '/creador': vista.creador
};

module.exports.urls = urls;
