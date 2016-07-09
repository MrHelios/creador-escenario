// En la documentacion linea 7.
function Tablero(canvas) {
  this.lienzo = document.getElementById(canvas).getContext("2d");
  this.ID = canvas;
  this.long = document.getElementById(canvas).width;
  this.altura = document.getElementById(canvas).height;

  // Consultas.
  this.obtenerLong = function() { return this.long;}
  this.obtenerAltura = function() { return this.altura;}
  this.obtenerID = function() { return this.ID;}
}

Tablero.prototype.limpiar = function(tablero) {
  tablero.lienzo.beginPath();
  tablero.lienzo.fillStyle = "white";
  tablero.lienzo.fillRect(0,0,tablero.long,tablero.altura);
  tablero.lienzo.stroke();
}
