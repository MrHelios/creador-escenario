var db = require('../miFrame/db');

var database = new db.DB('test.db');
database.crearDatabase();

var tabla_archivos = new db.Tabla('archivo', database.db);
tabla_archivos.agregarValores('nombre', 'TEXT');
tabla_archivos.crearTabla();
/*
tabla_archivos.insertar({'nombre': '"hola"'});
tabla_archivos.insertar({'nombre': '"chauchas"'});
tabla_archivos.insertar({'nombre': '"jeje"'});
*/

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

var conexion_db = function(data) {  

  for(var i=0; i<data.length; i++) {
    if(data[i].accion == 'agregar') {
      if(data[i].tipo == 'linea') tabla_linea.insertar(organizar(data[i]));
      else tabla_rect.insertar(organizar(data[i]));
    }
    else if(data[i].accion == 'eliminar') {
      if(data[i].tipo == 'linea') tabla_linea.eliminar('xi='+ data[i].xi + ' AND yi='+ data[i].yi + ' AND xf='+ data[i].xf + ' AND yf='+ data[i].yf);
      else tabla_rect.eliminar('xi='+ data[i].xi + ' AND yi='+ data[i].yi + ' AND a='+ data[i].a + ' AND l='+ data[i].l);
    };
  }
  tabla_linea.mostrar();
  tabla_rect.mostrar();
}

organizar = function(data) {
  var armado = [];

  if(data.tipo == 'linea') {
    armado.push('"' + data.nombre + '"');
    armado.push(data.xi);
    armado.push(data.yi);
    armado.push(data.xf);
    armado.push(data.yf);
  }
  else {
    armado.push('"' + data.nombre + '"');
    armado.push(data.xi);
    armado.push(data.yi);
    armado.push(data.a);
    armado.push(data.l);
  }
  return armado;
}


module.exports.conexion_db = conexion_db;
module.exports.tabla_archivos = tabla_archivos;
module.exports.tabla_linea = tabla_linea;
module.exports.tabla_rect = tabla_rect;
