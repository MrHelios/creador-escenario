actualizacion = function() {

  // Mientras la serpiente este viva el juego seguira.
  if(!victoria) clearInterval(jugando);

  Tablero.prototype.limpiar(tablero);

  // Dibujo la serpiente.
  for(var i=0; i<serpiente.obtenerCant();i++) {
    if(i==0) {

        if(!serpiente.obtenerPos(0).giro) serpiente.obtenerPos(i).movimiento();

        // Verificamos la nueva posicion.
        var puntoi = serpiente.obtenerPos(0).obtenerPI();
        var pos_actual = esc.obtenerPos(puntoi.obtenerX()/5,puntoi.obtenerY()/5)
        if(!victoria && pos_actual.obtenerPared()) victoria=false;
        else if(!victoria && pos_actual.obtenerManzana()) {
          // Removemos la posicion actual de la manzana.
          var pos = pos_actual.obtenerObjManzana();
          pos_actual.desactivarManzana();
          pos_actual.establecerManzana(null);
          manzanas.obtenerPos(pos).posAleatoria();

          serpiente.extender(serpiente);

          // Agregamos la nueva posicion.
          var x = manzanas.obtenerPos(pos).obtenerCentro().obtenerX();
          var y = manzanas.obtenerPos(pos).obtenerCentro().obtenerY();
          esc.obtenerPos(x/5,y/5).activarManzana();
          esc.obtenerPos(x/5,y/5).establecerManzana(pos);
        }
      }
    else {

        var puntoi = serpiente.obtenerPos(i-1).obtenerPF().clone();
        var puntof = serpiente.obtenerPos(i).obtenerPI().clone();

        serpiente.obtenerPos(i).establecerPI(puntoi);
        serpiente.obtenerPos(i).establecerPF(puntof);
    }
    serpiente.obtenerPos(i).dibujar();
  }

  // Verficamos que la cabeza de la serpiente no coma su propio cuerpo.
  var puntoi = serpiente.obtenerPos(0).obtenerPI();
  var j=1;
  while(j<serpiente.obtenerCant() && victoria) {
    if(serpiente.obtenerPos(j).obtenerPF().equals(puntoi)) victoria=false;
    j++;
  }


  serpiente.obtenerPos(0).giro = false;

  // Dibujo de manzanas.
  for(var i=0; i<manzanas.obtenerCant(); i++) {
    manzanas.obtenerPos(i).dibujar();
  }

}
