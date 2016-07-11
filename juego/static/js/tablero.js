function Tablero(canvas) {
  this.lienzo = document.getElementById(canvas).getContext("2d");
  this.ID = canvas;
  this.long = document.getElementById(canvas).width;
  this.altura = document.getElementById(canvas).height;

  // Comandos.
  this.limpiar = function() {
    this.lienzo.beginPath();
    this.lienzo.fillStyle = "white";
    this.lienzo.fillRect(0,0,this.long,this.altura);
    this.lienzo.stroke();
  }  

  // Consultas.
  this.obtenerLong = function() { return this.long;}
  this.obtenerAltura = function() { return this.altura;}
  this.obtenerID = function() { return this.ID;}
}
