function Escenario(canvas) {
  Tablero.call(this,canvas);

  var fila = this.obtenerLong()/5;
  var columna = this.obtenerAltura()/5;

  this.grilla = new Array(fila);
  for(var i=0;i<=fila;i++) {
    this.grilla[i] = new Array(columna);
  }

  this.establecerPos = function(i,j,obj) {
    this.grilla[i][j] = obj;
  }

  this.obtenerPos = function(i,j) { return this.grilla[i][j];}
  this.fila = function() { return this.obtenerLong()/5;}
  this.columna = function() { return this.obtenerAltura()/5;}
}
