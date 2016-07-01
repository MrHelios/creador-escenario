function enlaceEscenario(cvs,i,p) {
  Tablero.call(this,cvs);

  this.punto = p || new Punto(cvs, 18, 50);;
  this.longitud = 100;
  this.altura = 30;
  this.info = i;

  this.color = "rgb(204,204,204)"
  this.colorSeleccion = "red";
  this.colorActual = null;

  this.establecerPunto = function(p) {
    this.punto = p;
  }

  this.dibujar = function() {
    var rectangulo = new Rectangulo(cvs, this.punto, this.longitud, this.altura);
    rectangulo.color = this.colorActual;
    rectangulo.dibujar();
  }

  this.equals = function(enlace) {
    return this.punto.equals(enlace.punto) && this.info.equals(enlace.info);
  }

  this.obtenerPunto = function() { return this.punto;}
}
