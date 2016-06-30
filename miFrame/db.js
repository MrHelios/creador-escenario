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
        s += i +' '+ self.valores[i];
      }
      s += ')';
      console.log(s);
      self.db.run('CREATE TABLE IF NOT EXISTS ' + self.nombre + ' ' + s);
    });
  }

  this.insertar = function(valores) {
    var s = Tabla.prototype.acomodarINSERT(valores);

    console.log('INSERT INTO ' + this.nombre + ' VALUES ' + s);
    this.db.run('INSERT INTO ' + this.nombre + ' VALUES ' + s);
  }

  this.mostrar = function() {
    var s = Tabla.prototype.acomodarSELECT(this.valores);

    console.log('Mostrar:' + s);
    this.db.each('SELECT ' + s + ' FROM ' + this.nombre, function(err, fila) {
      if(err) console.log(err);
      else {
        console.log(fila);
      }
    });
  }

  this.buscar = function(num) {
    this.db.each('SELECT * FROM ' + this.nombre + ' WHERE id=' + num, function(err, fila) {
      if(err) console.log(err);
      else {
        console.log('Resultado: ' + fila);
      }
    });
  }

  this.eliminar = function(num) {
    this.db.each('DELETE FROM ' + this.nombre + ' WHERE id=' + num, function(err, fila) {
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
