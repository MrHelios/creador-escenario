var sqlite3 = require('sqlite3').verbose();

function DB(archivo) {
  this.archivo = archivo;
  this.db = null;
  self = this;

  this.crearDatabase = function() {
    this.db = new sqlite3.Database(this.archivo);
  }
}

function Tabla(nombre, db) {
  this.db = db;
  self = this;
  this.nombre = nombre;
  this.valores = {};

  this.agregarValores = function(k,v) {
    this.valores[k] = v;
  }

  this.crearTabla = function() {

    self.db.serialize(function() {
      var s = '(';
      for(var i in self.valores) {
        s += i +' '+ self.valores[i] +',';
      }
      s = s.substring(0,s.length-1);
      s += ')';
      console.log(s);
      self.db.run('CREATE TABLE IF NOT EXISTS ' + self.nombre + ' ' + s);
    });
  }

  this.insertar = function(valores) {
    var s = Tabla.prototype.acomodarINSERT(valores);

    //console.log('INSERT INTO ' + this.nombre + ' VALUES ' + s);
    console.log('Te estas ejecutando?');
    this.db.run('INSERT INTO ' + this.nombre + ' VALUES ' + s);
  }

  this.mostrar = function() {
    var s = Tabla.prototype.acomodarSELECT(this.valores);

    //console.log('Mostrar:' + s);
    this.db.each('SELECT ' + s + ' FROM ' + this.nombre, function(err, fila) {
      if(err) console.log(err);
      else {
        console.log(fila);
      }
    });
  }

  // Este metodo lo utilizo para buscar en base de datos y generar pagina HTML.
  // Hacer el metodo mas generico.
  // El parametro f es un arreglo
  this.buscarTODO = function(num, f) {

    this.db.all('SELECT * FROM ' + this.nombre + num, function(err, fila) {
      if(err) console.log(err);
      else {
        dicc = {};
        // Genera codigo HTML.
        for(var i=0; i<fila.length; i++) {
          dicc[i] = '<li>' + fila[i]['nombre'] + '</li>';
        }
        // Metodo(direccion archivo HTML, respuest SERVER)
        f[0](f[1],f[2],f[3],dicc);
      }
    });
  }

  // Este metodo lo utilizamos para enviar info a la pagina.
  this.agregar = function(num, nombre, f) {

    this.db.all('SELECT * FROM ' + this.nombre + num, function(err,fila) {
      if(err) console.log(err);
      else {
        f.emit(nombre, fila);
      }
    });
  }

  // Lo utilizo para ver si ya existe el archivo.
  this.buscar = function(num, f, valor) {

    this.db.get('SELECT * FROM ' + this.nombre + num, function(err, fila) {
      if(err) console.log(err);
      else {
        if(!fila) f.insertar(valor);
      }
    });
  }

  this.eliminar = function(num) {
    this.db.each('DELETE FROM ' + this.nombre + ' WHERE ' + num, function(err, fila) {
      if(err) console.log(err);
      else {
        console.log('Eliminado.');
      }
    });
  }

}

Tabla.prototype.acomodarSELECT = function(valores) {
  s = '';
  for(var i in valores) {
    s += i + ',';
  }
  s = s.substring(0,s.length-1);

  return s;
}

Tabla.prototype.acomodarINSERT = function(valores) {
  s = '(';
  for(var i in valores) {
    s += valores[i] + ',';
  }
  s = s.substring(0,s.length-1);
  s += ')';

  return s;
}

module.exports.DB = DB;
module.exports.Tabla = Tabla;
