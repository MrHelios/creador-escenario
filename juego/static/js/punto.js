
function Punto(canvas,x,y) {
  // Constructor.
  Tablero.call(this, canvas);
  this.x = x;
  this.y = y;

  // Comandos.
  this.establecerX = function(x) {
    this.x = x;
  }
  this.establecerY = function(y) {
    this.y = y;
  }

  // Consultas.
  this.obtenerX = function() { return this.x;}
  this.obtenerY = function() { return this.y;}
  this.clone = function() { return new Punto(this.ID,this.x,this.y);}
  this.equals = function(p) {
    return (this.x == p.obtenerX() && this.y == p.obtenerY());
  }
}

/*
Como debe hacerse herencia. INVESTIGAR MAS.

Punto.prototype = Object.create(Tablero.prototype);
Punto.prototype.constructor = Punto;
*/
