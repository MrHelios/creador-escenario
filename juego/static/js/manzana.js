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
