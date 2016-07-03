
function Socket() {
  this.socket = io();
  this.ultimo_enviado = [];
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
