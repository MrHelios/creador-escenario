function IA() {

  // Acomoda el click a una posicion.
  this.reubicar = function(posX,posY) {
    var u = {x: posX,y:posY};
    u.x = IA.prototype.reubicarCuentas(u.x);
    u.y = IA.prototype.reubicarCuentas(u.y);
    return u;
  }
}

// El parametro debe ser boolean.
IA.prototype.opuesto = function(b) {
  return !b;
}

//  Todas las instancias.
IA.prototype.instancias = [
  'Rectangulo','Punto','Circulo','Linea','Escenario','enlaceEscenario'
];

/*
  Requiere que existan coleccion y coleccion_monitor.
  Arma la linea.
  Este metodo se ejecutara al inicio solo para recuperar.

  coleccion,cvs,clickx,clicky,mousex,mousey,tecla
  coleccion, coleccion_monitor, cvs, clickx, clicky, tecla
*/
IA.prototype.dibujar = function(cvs, coleccion, coleccion_monitor, clickx, clicky, mousex, mousey, tecla) {
  var c = new Circulo(cvs,3,new Punto(cvs,clickx,clicky));
  c.color = "red";
  coleccion.insertar(c);

  if(tecla == 76){
    var l = new Linea(cvs,new Punto(cvs,clickx,clicky),new Punto(cvs,mousex,mousey));
    l.color = "blue";
    coleccion.insertar(l);
  }
  else if(tecla == 82){
    var l = new Rectangulo(cvs,new Punto(cvs,clickx,clicky),mousex,mousey);
    l.color = "blue";
    coleccion.insertar(l);
  }

  var l = coleccion.objetos[coleccion.cant - 1];
  var establecido = true;

  if(tecla == 76) {
    var c = new Circulo(cvs,3,new Punto(cvs, mousex, mousey));
    c.color = "red";
    coleccion.insertar(c);
  }
  // Establecemos las medidas del Rectangulo.
  else if(tecla == 82) {
    var c = new Circulo(cvs,3,new Punto(cvs, clickx+mousex, clicky+mousey));
    c.color = "red";
    coleccion.insertar(c);
  }

  // Creacion del Enlace.
  if(establecido) {
    c = coleccion_monitor.cant - 1;
    if(c == -1) {
      coleccion_monitor.insertar(new enlaceEscenario(cvs, l));
      coleccion_monitor.objetos[0].colorActual = coleccion_monitor.objetos[0].color;
    }
    else {
      // Agrego el punto del ultimo elemento.
      coleccion_monitor.insertar(new enlaceEscenario(cvs, l,coleccion_monitor.objetos[c].punto.clone()));
      // Le sumo 35 px.
      coleccion_monitor.objetos[c+1].punto.establecerY(coleccion_monitor.objetos[c+1].punto.obtenerY() + 35);
      coleccion_monitor.objetos[coleccion_monitor.cant-1].colorActual = coleccion_monitor.objetos[coleccion_monitor.cant-1].color;
    }
  }
}

/*
 Ubica la posicion en una posicion Multiplo de 10.
 Se ejecutara cuando se ejecute reubicar.
*/
IA.prototype.reubicarCuentas = function(numero) {
  var temp = numero;
  if( temp % 10 <= 5 ) temp = temp - (temp % 10);
  else temp = temp + (10 - (temp % 10));
  return temp;
}

// Solo dos teclas.
IA.prototype.teclaCorrecta = function(tecla) {
  if(tecla == 76 || tecla == 82) return true;
  else return false;
}

/*
  Inteligencia al Dibujo.
*/
function IA_Dibujo() {
  IA.call(this);

  // Si esta en el tablero de dibujo debe analizarse si ya hubo un click.
  this.permitirDibujo = function(escenario, estado_click, x, y) {
    var puede;

    if( Area.prototype.estaEnEscenario(x,y,escenario) && !estado_click ) puede = true;
    else puede = false;
    return puede;
  }

  // Cuando se verifico el click y la tecla
  // Se comienza a construir la Linea o el Rectangulo.
  this.empezarDibujo = function(coleccion,cvs,clickx,clicky,mousex,mousey,tecla){
    var c = new Circulo(cvs,3,new Punto(cvs,clickx,clicky));
    c.color = "red";
    coleccion.insertar(c);

    if(tecla == 76){
      var l = new Linea(cvs,new Punto(cvs,clickx,clicky),new Punto(cvs,mousex,mousey));
      l.color = "blue";
      coleccion.insertar(l);
    }
    else if(tecla == 82){
      var l = new Rectangulo(cvs,new Punto(cvs,clickx,clicky),mousex,mousey);
      l.color = "blue";
      coleccion.insertar(l);
    }
    // Requiere despues de esta ejecucion cambiar el estado de activo.
  }

  // Terminar el dibujo.
  this.finalizarDibujo = function(coleccion, coleccion_monitor, cvs, clickx, clicky, tecla) {
    var l = coleccion.objetos[coleccion.cant - 1];
    var establecido = false;

    // Establecemos el ultimo punto de la linea.
    if(tecla == 76) {
      l.obtenerPF().establecerX(clickx);
      l.obtenerPF().establecerY(clicky);
      establecido = true;
    }
    // Establecemos las medidas del Rectangulo.
    else if(tecla == 82) {
      l.establecerLongitud(clickx - l.obtenerPI().obtenerX());
      l.establecerAltura(clicky - l.obtenerPI().obtenerY());
      establecido = true;
    }
    // Creacion del Enlace.
    if(establecido) {
      var c = new Circulo(cvs,3,new Punto(cvs, clickx, clicky));
      c.color = "red";
      coleccion.insertar(c);

      c = coleccion_monitor.cant - 1;
      if(c == -1) {
        coleccion_monitor.insertar(new enlaceEscenario(cvs, l));
        coleccion_monitor.objetos[0].colorActual = coleccion_monitor.objetos[0].color;
      }
      else {
        // Agrego el punto del ultimo elemento.
        coleccion_monitor.insertar(new enlaceEscenario(cvs, l,coleccion_monitor.objetos[c].punto.clone()));
        // Le sumo 35 px.
        coleccion_monitor.objetos[c+1].punto.establecerY(coleccion_monitor.objetos[c+1].punto.obtenerY() + 35);
        coleccion_monitor.objetos[coleccion_monitor.cant-1].colorActual = coleccion_monitor.objetos[coleccion_monitor.cant-1].color;
      }
    }
  }
}

/*
  Inteligencia al Enlace.
*/
function IA_Enlace() {
  IA.call(this);

  this.seleccionEnlace = function(coleccion,x,y) {
    var i=0;
    var encontrado=false;
    var px = x, py = y;

    while(i<coleccion.cant && !encontrado) {
      var pix = coleccion.objetos[i].punto.obtenerX();
      var piy = coleccion.objetos[i].punto.obtenerY();
      var pfx = coleccion.objetos[i].longitud + pix;
      var pfy = coleccion.objetos[i].altura + piy;
      if (pix<=px && pfx>px && piy<=py && pfy>py) encontrado = true;
      else i++;
    }
    if(!encontrado) i=-1;
    return i;
  }

  this.obtenerObjetoEnlace = function(coleccion_monitor,coleccion_obj,pos) {
    var i=0, instancias = this.instancias;
    var encontrado=false, posicion_objeto = -1;
    var tipo_monitor = coleccion_monitor.tipoInstancia(coleccion_monitor.objetos[pos].info);

    while(i<coleccion_obj.cant && !encontrado) {
      if(coleccion_obj.objetos[i] instanceof eval(IA.prototype.instancias[tipo_monitor]) && coleccion_obj.objetos[i].equals(coleccion_monitor.objetos[pos].info)) {
        posicion_objeto = i;
      }
      i++;
    }
    return posicion_objeto;
  }

  this.pintarSeleccion = function(coleccion,monitor,i) {
    coleccion.objetos[i].colorActual = coleccion.objetos[i].colorSeleccion;
    Area.prototype.pintar(monitor);
    coleccion.dibujarTodo();
    coleccion.objetos[i].colorActual = coleccion.objetos[i].color;
  }

}

/*
  FALTA Documentacion:
  Cada posicion posible del tablero tiene atributos.
*/
function IA_Objetos() {
  IA.call(this);

  this.pared = false;
  this.serpiente = false;
  this.manzana = false;
  this.objManzana = null;

  this.establecerManzana = function(objeto) {
    this.objManzana = objeto;
  }

  this.activarPared = function() { this.pared = true;}
  this.activarSerpiente = function() { this.serpiente = true;}
  this.activarManzana = function() { this.manzana = true;}
  this.desactivarPared = function() { this.pared = false;}
  this.desactivarSerpiente = function() { this.serpiente = false;}
  this.desactivarManzana = function() { this.manzana = false;}

  this.obtenerPared = function() { return this.pared;}
  this.obtenerManzana = function() { return this.manzana;}
  this.obtenerSerpiente = function() { return this.serpiente;}
  this.obtenerObjManzana = function() { return this.objManzana;}

  this.clone = function() {
    o = new IA_Objetos();
    return o;
  }
}

/*
  FALTA Documentacion:
  Utilizado para el juego.
*/
function IA_Actualizador() {
  IA.call(this);

  //
  this.actualizacion = function() {

    // Mientras la serpiente este viva el juego seguira.
    if(!victoria) clearInterval(jugando);

    Tablero.prototype.limpiar(tablero);
    muros.dibujarTodo();

    // Dibujo la serpiente.
    for(var i=0; i<serpiente.obtenerCant();i++) {
      if(i==0) {

          if(!serpiente.obtenerPos(0).giro) serpiente.obtenerPos(i).movimiento();

          // Verificamos la nueva posicion.
          var puntoi = serpiente.obtenerPos(0).obtenerPI();
          var pos_actual = esc.obtenerPos(puntoi.obtenerX()/esc.multiplicador, puntoi.obtenerY()/esc.multiplicador);

          if(victoria && pos_actual.obtenerPared()) victoria=false;
          else if(victoria && pos_actual.obtenerManzana()) {
            // Removemos la posicion actual de la manzana.
            var pos = pos_actual.obtenerObjManzana();
            pos_actual.desactivarManzana();
            pos_actual.establecerManzana(null);
            manzanas.obtenerPos(pos).posAleatoria();

            serpiente.extender(serpiente);

            // Agregamos la nueva posicion.
            var x = manzanas.obtenerPos(pos).obtenerCentro().obtenerX();
            var y = manzanas.obtenerPos(pos).obtenerCentro().obtenerY();
            esc.obtenerPos(x/esc.multiplicador, y/esc.multiplicador).activarManzana();
            esc.obtenerPos(x/esc.multiplicador, y/esc.multiplicador).establecerManzana(pos);
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
}
