
// Funcion que sirve para detectar movimiento y click del mouse
// Tambien detecta movimiento del teclado.
function Oyente(canvas) {
  Tablero.call(this,canvas);
  this.activo = false;
  this.tecla = null;
  this.movmousex = 0;
  this.movmousey = 0;

  this.seleccion_objeto = -1;
  this.seleccion_enlace = -1;


  // Importante para no perder el scope.
  var self = this;

  this.escucharTeclado = function() {
    window.addEventListener("keydown",this.apretarTecla,false);
  }
  // Movimiento del mouse.
  this.detectorMovMouse = function() {
    document.getElementById(this.ID).addEventListener("mousemove", this.movMouse,false);
  }
  // Click del mouse.
  this.escucharMouse = function() {
    document.getElementById(this.ID).addEventListener("mousedown",this.click,false);
  }

  this.deshabilitarSeleccion = function() {
    this.seleccion_objeto = -1;
    this.seleccion_enlace = -1;
  }

  this.click = function(event) {
    var u = inteligencia.reubicar(event.x,event.y);

    // Esto se realiza en el area-tablero.
    // Verifica si el primer click en el tablero tiene algun objeto seleccionado.
    if(inteligencia.permitirDibujo(escenario,self.activo,u.x,u.y) && inteligencia.teclaCorrecta(self.tecla)) {
      inteligencia.empezarDibujo(obj,self.ID,u.x,u.y,self.movmousex,self.movmousey,self.tecla);
      self.activo = inteligencia.opuesto(self.activo);
    }
    // Para terminar necesito que activo sea true y para que sirva en el metodo le doy el valor opuesto.
    else if(inteligencia.permitirDibujo(escenario,!self.activo,u.x,u.y)){
      inteligencia.finalizarDibujo(obj,monitor_obj,self.ID,u.x,u.y,self.tecla);

      Tablero.prototype.limpiar(tablero);
      monitor_obj.dibujarTodo();
      obj.dibujarTodo();
      self.activo = inteligencia.opuesto(self.activo);
    }

    // Esto se realiza en el area-monitor.
    else if(inteligencia.permitirDibujo(monitor_objetos,self.activo,u.x,u.y)) {
      var i = inteligencia.seleccionEnlace(monitor_obj,event.x,event.y);
      var dir;
      if(i != -1){
        dir = inteligencia.obtenerObjetoEnlace(monitor_obj,obj,i);
        if(self.seleccion_objeto == -1) {
          inteligencia.pintarSeleccion(monitor_obj,monitor_objetos,i);
          obj.objetos[dir].color = "red";
          obj.objetos[dir].dibujar();
          self.seleccion_objeto = dir;
          self.seleccion_enlace = i;
        }
        else {
          obj.objetos[self.seleccion_objeto].color = "blue";
          obj.objetos[self.seleccion_objeto].dibujar();
          inteligencia.pintarSeleccion(monitor_obj,monitor_objetos,i);
          obj.objetos[dir].color = "red";
          obj.objetos[dir].dibujar();
          self.seleccion_objeto = dir;
          self.seleccion_enlace = i;
        }
      }
    }
  }

  this.movMouse = function(event) {
    self.movmousex = event.clientX;
    self.movmousey = event.clientY;

    // Movimiento de la linea.
    if(self.activo) {
      var l = obj.objetos[obj.cant - 1];
      if(self.tecla == 76) {
        l.obtenerPF().establecerX(self.movmousex);
        l.obtenerPF().establecerY(self.movmousey);
      }
      else {
        l.establecerLongitud(self.movmousex - l.obtenerPI().obtenerX());
        l.establecerAltura(self.movmousey - l.obtenerPI().obtenerY());
      }

      var p = inteligencia.reubicar(self.movmousex,self.movmousey);
      Tablero.prototype.limpiar(tablero);

      if( Area.prototype.estaEnEscenario(p.x, p.y, escenario)) {
        monitor_obj.dibujarTodo();
        obj.dibujarOpt(p.x/10 - 20,p.y/10 - 20,p.x/10 + 20,p.y/10 + 20);
      }
      else {
        monitor_obj.dibujarTodo();
        obj.dibujarTodo();
      }
    }
  }

  this.apretarTecla = function(event) {
    // console.log(event.keyCode);
    // tecla: l
    if(event.keyCode==76) {
      self.tecla = 76;
    }
    // tecla: r
    else if(event.keyCode==82) {
      self.tecla = 82;
    }
    // tecla: Esc
    else if(event.keyCode==27) {
      self.tecla = 27;

      if(self.activo) {
        // Elimina el ultimo.
        for(var i=0; i<2;i++) obj.eliminar(obj.objetos[obj.cant - 1]);

        self.activo = inteligencia.opuesto(self.activo);
        Tablero.prototype.limpiar(tablero);
        monitor_obj.dibujarTodo();
        obj.dibujarTodo();
      }
      else if(self.seleccion_objeto != -1) {
        obj.objetos[self.seleccion_objeto].color = "blue";
        obj.objetos[self.seleccion_objeto].dibujar();

        tablero.limpiar();
        monitor_obj.dibujarTodo();
        obj.dibujarTodo();
      }

      self.deshabilitarSeleccion();
    }
    // tecla: Del
    else if(event.keyCode==46 && self.seleccion_objeto != -1 && self.seleccion_enlace != -1) {
      /*
      for(var i=0; i<3;i++) {
        obj.objetos.pop();
        obj.cant--;
      }
      */
      obj.eliminar(obj.objetos[self.seleccion_objeto + 1]);
      obj.eliminar(obj.objetos[self.seleccion_objeto]);
      obj.eliminar(obj.objetos[self.seleccion_objeto - 1]);


      monitor_obj.eliminar(monitor_obj.objetos[self.seleccion_enlace]);

      self.deshabilitarSeleccion();

      Tablero.prototype.limpiar(tablero);
      monitor_obj.dibujarTodo();
      obj.dibujarTodo();
    }
  }
}
