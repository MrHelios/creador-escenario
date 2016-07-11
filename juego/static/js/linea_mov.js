
function Linea_Mov(canvas,pi,pf) {
  Linea.call(this,canvas,pi,pf);
  this.velocidadX = 0;
  this.velocidadY = -5;
  this.giro = false;

  this.establecerVX = function(v) {
    this.velocidadX = v;
    this.velocidadY = 0;
  }
  this.establecerVY = function(v) {
    this.velocidadX = 0;
    this.velocidadY = v;
  }
  this.movimiento = function() {
    this.obtenerPI().establecerX( this.obtenerPI().obtenerX() + this.velocidadX );
    this.obtenerPF().establecerX( this.obtenerPF().obtenerX() + this.velocidadX );

    this.obtenerPI().establecerY( this.obtenerPI().obtenerY() + this.velocidadY );
    this.obtenerPF().establecerY( this.obtenerPF().obtenerY() + this.velocidadY );
  }

  this.obtenerVX = function() { return this.velocidadX;}
  this.obtenerVY = function() { return this.velocidadY;}
}
