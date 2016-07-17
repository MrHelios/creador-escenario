// A partir de la linea 130.
function Socket() {
  this.socket = io();
  this.ultimo_enviado = [];
  self = this;

  // Recolecta el estado del archivo.
  // Esto se ejecuta al inicio.
  this.ult_enviado = function(data) {
    this.ultimo_enviado.push(data);
  }

  // Se agregan elementos de lineas.
  // Funciona para la pagina creador.
  this.onLinea = function(nombre) {
    this.socket.on(nombre, function(data) {

      for(var i=0; i<data.length;i++) {
        var dmx = Socket.prototype.dmx;
        var dmy = Socket.prototype.dmy;

        self.ult_enviado({'tipo': 'linea', 'nombre':nombre_archivo_mapa, 'accion':'conservar', 'xi':data[i].xi, 'yi':data[i].yi, 'xf':data[i].xf, 'yf':data[i].yf});
        // Parametros (cvs, coleccion, coleccion_monitor, clickx, clicky, mousex, mousey, tecla)
        IA.prototype.dibujar(cvs, obj, monitor_obj, data[i].xi + dmx, data[i].yi + dmy, data[i].xf + dmx, data[i].yf + dmy, 76);
      }
      monitor_obj.dibujarTodo();
      obj.dibujarTodo();
    });
  }

  // Se agregan elementos de rectangulo.
  // Funciona para la pagina creador.
  this.onRect = function(nombre) {
    this.socket.on(nombre, function(data) {

      for(var i=0; i<data.length;i++) {
        var dmx = Socket.prototype.dmx;
        var dmy = Socket.prototype.dmy;

        self.ult_enviado({'tipo': 'rectangulo', 'nombre':nombre_archivo_mapa, 'accion':'conservar', 'xi':data[i].xi, 'yi':data[i].yi, 'l':data[i].l, 'a':data[i].a});
        // Parametros (cvs, coleccion, coleccion_monitor, clickx, clicky, mousex, mousey, tecla)
        IA.prototype.dibujar(cvs, obj, monitor_obj, data[i].xi + dmx, data[i].yi + dmy, data[i].l, data[i].a, 82);
      }
      monitor_obj.dibujarTodo();
      obj.dibujarTodo();
    });
  }

  // Se agregan elementos de rectangulos.
  // Funciona para la pagina juego.
  // Activamos pared.
  this.onLevelRect = function(nombre) {
    this.socket.on(nombre, function(data) {

      for(var k=0;k<data.length; k++) {
        /*
        Altura: yi - yf
        Crea la pared a traves de la longitud.

        El +10 es una correccion manual que aplicamos.
        */
        var i = data[k].xi, final = data[k].l + i;
        var j = data[k].yi, finalj = data[k].a + j;



        if(data[k].l>=0) {
          while(i<final) {
            esc.obtenerPos(i/esc.multiplicador,j/esc.multiplicador).activarPared();
            esc.obtenerPos(i/esc.multiplicador,finalj/esc.multiplicador).activarPared();
            i+=5;
          }
        }
        else {
          while(i>final) {
            esc.obtenerPos(i/esc.multiplicador,j/esc.multiplicador).activarPared();
            esc.obtenerPos(i/esc.multiplicador,finalj/esc.multiplicador).activarPared();
            i-=5;
          }
        }

        /*
        Logitud: xi - xf
        Crea la pared a traves de la altura.
        */
        var i = data[k].xi, final = data[k].l + i;

        if(data[k].a>=0) {
          while(j<finalj) {
            esc.obtenerPos(i/esc.multiplicador,j/esc.multiplicador).activarPared();
            esc.obtenerPos(final/esc.multiplicador,j/esc.multiplicador).activarPared();
            j+=5;
          }
        }
        else {
          while(j>finalj) {
            esc.obtenerPos(i/esc.multiplicador,j/esc.multiplicador).activarPared();
            esc.obtenerPos(final/esc.multiplicador,j/esc.multiplicador).activarPared();
            j-=5;
          }
        }

        muros.insertar(new Rectangulo(cvs, new Punto(cvs, data[k].xi, data[k].yi), data[k].l, data[k].a));
      }

    });
  }

  this.enviar = function(destino, obj) {
    this.socket.emit(destino,obj);
  }

  // Se agregan elementos de lineas.
  // Funciona para la pagina juego.
  // Activamos pared.
  this.onLevelLinea = function(nombre) {
    this.socket.on(nombre, function(data) {
      for(var k=0;k<data.length; k++) {
        /*
        Altura: yi - yf
        Crea la pared a traves de la longitud.
        */
        var i = data[k].xi, final = data[k].xf;
        var j = data[k].yi, finalj = data[k].yf;

        if(i<=final) {
          while(i<final) {
            esc.obtenerPos(i/esc.multiplicador, j/esc.multiplicador).activarPared();
            i+=5;
          }
        }
        else {
          while(i>final) {
            esc.obtenerPos(i/esc.multiplicador, j/esc.multiplicador).activarPared();
            i-=5;
          }
        }

        /*
        Logitud: xi - xf
        Crea la pared a traves de la altura.
        */
        var i = data[k].xi;

        if(j<=final) {
          while(j<finalj) {
            esc.obtenerPos(i/esc.multiplicador, j/esc.multiplicador).activarPared();
            j+=5;
          }
        }
        else {
          while(j>finalj) {
            esc.obtenerPos(i/esc.multiplicador, j/esc.multiplicador).activarPared();
            j-=5;
          }
        }

        muros.insertar(new Linea(cvs, new Punto(cvs, data[k].xi, data[k].yi), new Punto(cvs, data[k].xf, data[k].yf)));
      }

    });
  }

}

/*
Al recolectar la informacion debe quedar relativa.
*/
Socket.prototype.recolectar = function(objeto) {
  var enviar = [];
  var dmx = Socket.prototype.dmx;
  var dmy = Socket.prototype.dmy;

  for(var i=0; i<objeto.length; i++) {

    if(objeto[i].info instanceof Linea) {
      dato = { tipo: 'linea',
            accion: '',
            nombre: nombre_archivo_mapa,
            xi: objeto[i].info.obtenerPI().obtenerX() - dmx,
            yi: objeto[i].info.obtenerPI().obtenerY() - dmy,
            xf: objeto[i].info.obtenerPF().obtenerX() - dmx,
            yf: objeto[i].info.obtenerPF().obtenerY() - dmy
          }
      }
    else {
      dato = { tipo: 'rectangulo',
            accion: '',
            nombre: nombre_archivo_mapa,
            xi: objeto[i].info.obtenerPI().obtenerX() - dmx,
            yi: objeto[i].info.obtenerPI().obtenerY() - dmy,
            a: objeto[i].info.obtenerAltura(),
            l: objeto[i].info.obtenerLongitud()
          }
    }
    enviar.push(dato);
  }
  return enviar;
}

Socket.prototype.comparar = function(nuevo, database) {
  var comp = [];

  // Busco los objetos que fueron eliminados.
  for(var i=0; i<database.length; i++) {
    var j=0, encontrado = false;

    while(j<nuevo.length && !encontrado) {

      if(nuevo[j].tipo == database[i].tipo) {
        if(nuevo[j].tipo == 'linea' && nuevo[j].xi == database[i].xi && nuevo[j].yi == database[i].yi && nuevo[j].xf == database[i].xf && nuevo[j].yf == database[i].yf) encontrado=true;
        else if(nuevo[j].xi == database[i].xi && nuevo[j].yi == database[i].yi && nuevo[j].a == database[i].a && nuevo[j].l == database[i].l) encontrado=true;
      }
      j++;
    }

    if(!encontrado) {
      if(database[i].accion != 'eliminar') {
        database[i].accion = 'eliminar';
        comp.push(database[i]);
      }
    }
    else {
      database[i].accion = 'conservar';
      comp.push(database[i]);
    }
  }

  // Busco los objetos que deben ser agregados.
  for(var i=0; i<nuevo.length; i++) {
    var j=0, encontrado = false;

    while(j<database.length && !encontrado) {
      if(nuevo[i].tipo == database[j].tipo) {
        if(nuevo[i].tipo == 'linea' && nuevo[i].xi == database[j].xi && nuevo[i].yi == database[j].yi && nuevo[i].xf == database[j].xf && nuevo[i].yf == database[j].yf) encontrado=true;
        else if(nuevo[i].xi == database[j].xi && nuevo[i].yi == database[j].yi && nuevo[i].a == database[j].a && nuevo[i].l == database[j].l) encontrado=true;
      }
      j++;
    }

    if(!encontrado) {
      nuevo[i].accion = 'agregar';
      comp.push(nuevo[i]);
    }
  }
  return comp;
}

Socket.prototype.enviar = function(objeto,s) {
  s.ultimo_enviado = objeto;
  s.socket.emit('guardar', objeto);
}

// Distancia del creador de escenario
Socket.prototype.dmx = 140;
Socket.prototype.dmy = 50;
