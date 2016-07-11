
function Coleccion(max) {
  this.longitud = new Array(max);
  this.cant = 0;
  this.color = "black";
  this.movimientoX = 0;
  this.movimientoY = 0;

  this.insertar = function(linea) {
    this.longitud[this.cant] = linea;
    this.cant++;
  }
  this.establecerMovX = function(v) {
    this.movimientoX = v;
    this.movimientoY = 0;
  }
  this.establecerMovY = function(v) {
    this.movimientoY = v;
    this.movimientoX = 0;
  }
  this.extender = function(serpiente) {
    i = serpiente.obtenerCant()-1;
    var linea_nueva = new Linea(cvs,serpiente.obtenerPos(i).obtenerPF().clone(),serpiente.obtenerPos(i).obtenerPF().clone());

    var dir = serpiente.obtenerPos(i).obtenerPI().obtenerY() - serpiente.obtenerPos(i).obtenerPF().obtenerY();
    if(dir!=0) linea_nueva.obtenerPF().establecerY(linea_nueva.obtenerPF().obtenerY() + dir);
    else {
      dir = linea_nueva.obtenerPI().obtenerX() - linea_nueva.obtenerPF().obtenerX();
      linea_nueva.obtenerPF().establecerX(linea_nueva.obtenerPF().obtenerX() + dir);
    }

    serpiente.insertar(linea_nueva);
  }

  this.obtenerPos = function(i) { return this.longitud[i];}
  this.obtenerCant = function() { return this.cant;}
}
