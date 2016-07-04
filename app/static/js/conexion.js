
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
  this.onLinea = function(nombre) {
    this.socket.on(nombre, function(data) {
      //(cvs, coleccion, coleccion_monitor, clickx, clicky, mousex, mousey, tecla)

      for(var i=0; i<data.length;i++) {
        self.ult_enviado({'tipo': 'linea', 'nombre':nombre_archivo_mapa, 'accion':'conservar', 'xi':data[i].xi, 'yi':data[i].yi, 'xf':data[i].xf, 'yf':data[i].yf});
        IA.prototype.dibujar(cvs, obj, monitor_obj, data[i].xi, data[i].yi, data[i].xf, data[i].yf, 76);
      }
      monitor_obj.dibujarTodo();
      obj.dibujarTodo();
    });
  }

  // Se agregan elementos de rectangulo.
  this.onRect = function(nombre) {
    this.socket.on(nombre, function(data) {
      //(cvs, coleccion, coleccion_monitor, clickx, clicky, mousex, mousey, tecla)

      for(var i=0; i<data.length;i++) {
        self.ult_enviado({'tipo': 'rectangulo', 'nombre':nombre_archivo_mapa, 'accion':'conservar', 'xi':data[i].xi, 'yi':data[i].yi, 'l':data[i].l, 'a':data[i].a});
        IA.prototype.dibujar(cvs, obj, monitor_obj, data[i].xi, data[i].yi, data[i].l, data[i].a, 82);
      }
      monitor_obj.dibujarTodo();
      obj.dibujarTodo();
    });
  }
  
}

Socket.prototype.recolectar = function(objeto) {
  var enviar = [];

  for(var i=0; i<objeto.length; i++) {

    if(objeto[i].info instanceof Linea) {
      dato = { tipo: 'linea',
            accion: '',
            nombre: nombre_archivo_mapa,
            xi: objeto[i].info.obtenerPI().obtenerX(),
            yi: objeto[i].info.obtenerPI().obtenerY(),
            xf: objeto[i].info.obtenerPF().obtenerX(),
            yf: objeto[i].info.obtenerPF().obtenerY()
          }
      }
    else {
      dato = { tipo: 'rectangulo',
            accion: '',
            nombre: nombre_archivo_mapa,
            xi: objeto[i].info.obtenerPI().obtenerX(),
            yi: objeto[i].info.obtenerPI().obtenerY(),
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
