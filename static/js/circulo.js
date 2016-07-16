
/*
Falta Documentacion.
*/

function Circulo(canvas,r,c) {
  Tablero.call(this,canvas);
  this.radio = r;
  this.centro = c;
  this.color = "black";

  this.establecerCentro = function(c) {
    this.centro = c;
  }
  this.establecerRadio = function(r) {
    this.radio = r;
  }
  this.dibujar = function() {
    this.lienzo.beginPath();
    this.lienzo.fillStyle = this.color;
    this.lienzo.arc(this.centro.obtenerX(), this.centro.obtenerY(),this.radio,0,2*Math.PI);
    this.lienzo.fill();
  }

  this.obtenerCentro = function() { return this.centro;}
  this.obtenerRadio = function() { return this.radio;}
  this.equals = function(c) {
    return ( this.centro.equals(c.obtenerCentro()) &&
             this.radio == c.obtenerRadio());
  }
  this.clone = function() {
    return new Circulo(this.ID,this.radio,this.centro.clone());
  }

}

/*
Falta Documentacion.
*/


function Manzana(canvas,r,c) {
  Circulo.call(this,canvas,r,c);

  this.posAleatoria = function() {
    var x = (Math.round(Math.random()*60) + 10)*5;
    var y = (Math.round(Math.random()*60) + 10)*5;

    this.centro.establecerX(x);
    this.centro.establecerY(y);
  }

  this.clone = function() {
    return new Manzana(this.ID,this.radio,this.centro.clone());
  }

}
