function IA() {

  this.reubicar = function(posX,posY) {
    var u = {x: posX,y:posY};
    u.x = IA.prototype.reubicarCuentas(u.x);
    u.y = IA.prototype.reubicarCuentas(u.y);
    return u;
  }

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
      if(coleccion_obj.objetos[i] instanceof eval(instancias[tipo_monitor]) && coleccion_obj.objetos[i].equals(coleccion_monitor.objetos[pos].info)) {
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

// Requiere que existan coleccion y coleccion_monitor.
// Arma la linea.
// Este metodo se ejecutara al inicio solo para recuperar.

// coleccion,cvs,clickx,clicky,mousex,mousey,tecla
// coleccion, coleccion_monitor, cvs, clickx, clicky, tecla
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

// Ubica la posicion en una posicion Multiplo de 10.
// Se ejecutara cuando se ejecute reubicar.
IA.prototype.reubicarCuentas = function(numero) {
  var temp = numero;
  if( temp % 10 <= 5 ) temp = temp - (temp % 10);
  else temp = temp + (10 - (temp % 10));
  return temp;
}

// El parametro debe ser boolean.
IA.prototype.opuesto = function(b) {
  return !b;
}

// Verifica que se haya seleccionado un tipo de dibujo.
// Por ahora solo hay dos tipos: Rect y linea.
IA.prototype.teclaCorrecta = function(tecla) {
  if(tecla == 76 || tecla == 82) return true;
  else return false;
}

// Guardo todas las instancias con las que trabajo.
IA.prototype.instancias = ['Rectangulo','Punto','Circulo','Linea','Escenario','enlaceEscenario'];
