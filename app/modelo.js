var db = require('../miFrame/db');

var database = new db.DB('test.db');
database.crearDatabase();

var tabla_archivos = new db.Tabla('archivo', database.db);
tabla_archivos.agregarValores('nombre', 'TEXT');
tabla_archivos.crearTabla();

var tabla_rect = new db.Tabla('rect', database.db);
tabla_rect.agregarValores('nombre', 'VARCHAR(255)');
tabla_rect.agregarValores('xi','INTEGER');
tabla_rect.agregarValores('yi','INTEGER');
tabla_rect.agregarValores('a','INTEGER');
tabla_rect.agregarValores('l','INTEGER');
tabla_rect.crearTabla();


var tabla_linea = new db.Tabla('linea', database.db);
tabla_linea.agregarValores('nombre','VARCHAR(255)');
tabla_linea.agregarValores('xi','INTEGER');
tabla_linea.agregarValores('yi','INTEGER');
tabla_linea.agregarValores('xf','INTEGER');
tabla_linea.agregarValores('yf','INTEGER');
tabla_linea.crearTabla();

module.exports.tabla_archivos = tabla_archivos;
module.exports.tabla_linea = tabla_linea;
module.exports.tabla_rect = tabla_rect;
