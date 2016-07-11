/*
No implemente el movimiento.
*/

function Linea(canvas,pi,pf) {
  Tablero.call(this,canvas);
  this.puntoI = pi;
  this.puntoF = pf;

  this.establecerPI = function(pi) {
    this.puntoI = pi;
  }
  this.establecerPF = function(pf) {
    this.puntoF = pf;
  }
  this.dibujar = function() {
    this.lienzo.beginPath();
    this.lienzo.moveTo(this.puntoI.obtenerX(), this.puntoI.obtenerY());
    this.lienzo.lineTo(this.puntoF.obtenerX(), this.puntoF.obtenerY());
    this.lienzo.stroke();
  }

  this.obtenerPI = function() { return this.puntoI;}
  this.obtenerPF = function() { return this.puntoF;}
  this.clone = function() {
    return new Linea(this.ID,this.puntoI.clone(),this.puntoF.clone());
  }

}
