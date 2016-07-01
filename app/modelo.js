var db = require('../miFrame/db');

var database = new db.DB('test.db');
database.crearDatabase();

var tabla_archivos = new db.Tabla('archivo', database.db);
tabla_archivos.agregarValores('nombre', 'TEXT');
tabla_archivos.crearTabla();

var tabla_linea = new db.Tabla('linea', database.db);
tabla_linea.agregarValores('nombre','TEXT','xi','INTEGER','yi','INTEGER','xf','INTEGER','yf','INTEGER');


module.exports.tabla_archivos = tabla_archivos;
