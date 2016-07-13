function Escenario(canvas, multi) {
  Tablero.call(this,canvas);

  this.multiplicador = multi || 1;

  var fila = this.obtenerLong()/this.multiplicador;
  var columna = this.obtenerAltura()/this.multiplicador;

  this.grilla = new Array(fila);
  for(var i=0;i<=fila;i++) {
    this.grilla[i] = new Array(columna);
  }

  this.establecerPos = function(i,j,obj) {
    this.grilla[i][j] = obj;
  }

  this.obtenerPos = function(i,j) { return this.grilla[i][j];}
  this.fila = function() { return this.obtenerLong()/this.multiplicador;}
  this.columna = function() { return this.obtenerAltura()/this.multiplicador;}
}
