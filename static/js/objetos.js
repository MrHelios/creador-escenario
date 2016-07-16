/*
FALTA Documentacion.
*/

function Objetos() {
  this.pared = false;
  this.serpiente = false;
  this.manzana = false;
  this.objManzana = null;

  this.establecerManzana = function(m) {
    this.objManzana = m;
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
    // No esta termino este metodo.
    o = new Objetos();
    return o;
  }
}
