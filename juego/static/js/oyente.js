
function Oyente() {
  this.escucharTeclado = function() {
    window.addEventListener("keydown",this.apretarTecla,false);
  }
  this.apretarTecla = function(event) {
    // Evento para detectar tecla.
    // w
    if(event.keyCode==87 && serpiente.obtenerPos(0).obtenerVX()!=0) {
      serpiente.obtenerPos(0).giro = true;
      temp = serpiente.obtenerPos(0).obtenerPI().clone();
      y = serpiente.obtenerPos(0).obtenerPI().obtenerY();

      serpiente.obtenerPos(0).obtenerPI().establecerY(y-5);
      serpiente.obtenerPos(0).establecerPF(temp);
      serpiente.obtenerPos(0).establecerVY(-5);
    }
    // s
    else if(event.keyCode==83 && serpiente.obtenerPos(0).obtenerVX()!=0) {
      serpiente.obtenerPos(0).giro = true;
      temp = serpiente.obtenerPos(0).obtenerPI().clone();
      y = serpiente.obtenerPos(0).obtenerPI().obtenerY();

      serpiente.obtenerPos(0).obtenerPI().establecerY(y+5);
      serpiente.obtenerPos(0).establecerPF(temp);
      serpiente.obtenerPos(0).establecerVY(5);
    }
    // a
    else if( event.keyCode==65 && serpiente.obtenerPos(0).obtenerVY()!=0) {
      serpiente.obtenerPos(0).giro = true;
      temp = serpiente.obtenerPos(0).obtenerPI().clone();
      x = serpiente.obtenerPos(0).obtenerPI().obtenerX();

      serpiente.obtenerPos(0).obtenerPI().establecerX(x-5);
      serpiente.obtenerPos(0).establecerPF(temp);
      serpiente.obtenerPos(0).establecerVX(-5);
    }
    // d
    else if( event.keyCode==68 && serpiente.obtenerPos(0).obtenerVY()!=0) {
      serpiente.obtenerPos(0).giro = true;
      temp = serpiente.obtenerPos(0).obtenerPI().clone();
      x = serpiente.obtenerPos(0).obtenerPI().obtenerX();

      serpiente.obtenerPos(0).obtenerPI().establecerX(x+5);
      serpiente.obtenerPos(0).establecerPF(temp);
      serpiente.obtenerPos(0).establecerVX(5);
    }
  }
}
