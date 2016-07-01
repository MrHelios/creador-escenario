

function Area(canvas,xi,yi,xf,yf) {
  Tablero.call(this,canvas);

  this.xi = xi;
  this.yi = yi;
  this.xf = xf;
  this.yf = yf;

}

// Verifica que el punto este el area.
Area.prototype.estaEnEscenario = function(px,py,area) {    
    return (area.xi<=px && area.xf>px && area.yi<=py && area.yf>py)
  }

Area.prototype.pintar = function(area) {
    var p = new Punto(area.ID, area.xi+5, area.yi+5);
    var r = new Rectangulo(area.ID, p, area.xf-5, area.yf-5);
    r.color = "white";
    r.pintar();
  }

Area.prototype.colorear = function(area, color) {
    var p = new Punto(area.ID, area.xi+5, area.yi+5);
    var r = new Rectangulo(area.ID, p, area.xf-5, area.yf-5);
    r.color = color;
    r.pintar();
  }


// Funcion que hereda de Area.
// Funcion ideada para crear el grillado del escenario.
function Escenario(cvs,xi,yi,xf,yf,multi) {
  Area.call(this,cvs,xi,yi,xf,yf);

  this.multiplicador = multi || 10;
  // xi: 15
  this.fila_inicio = this.xi/this.multiplicador;
  // yi: 6
  this.columna_inicio = this.yi/this.multiplicador;
  this.fila = this.xf/this.multiplicador;
  this.columna = this.yf/this.multiplicador;

  var p = new Punto(this.ID,(this.fila_inicio-1)*10,(this.columna_inicio-1)*10);
  var l = ((this.fila-this.fila_inicio)*this.multiplicador);
  var a = ((this.columna-this.columna_inicio)*this.multiplicador)
  this.limites = new Rectangulo(this.ID,p,l+10,a+10);

  this.grilla = new Array();
  for(var i=0;i<=this.fila;i++) {
    this.grilla.push(new Array());
  }

  this.establecerPos = function(i,j,obj) {
    this.grilla[i][j] = obj;
  }
  this.dibujar = function() {
    for(var i=this.fila_inicio; i<this.fila; i++) {
      for(var j=this.columna_inicio; j<this.columna; j++) {
        this.obtenerPos(i,j).dibujar();
      }
    }
  }
  this.dibujarParte = function(i0,j0,ifinal,jfinal) {
    if(i0<this.fila_inicio) i0=this.fila_inicio;
    else if(ifinal>this.fila) ifinal=this.fila;

    if(j0<this.columna_inicio) j0=this.columna_inicio;
    else if(jfinal>this.columna) jfinal=this.columna;

    for(var i=i0; i<ifinal; i++) {
      for(var j=j0; j<jfinal; j++) {
        this.obtenerPos(i,j).dibujar();
      }
    }
  }
  this.establecerGrilla = function() {
    for(var i=this.fila_inicio; i<this.fila; i++){
      for(var j=this.columna_inicio; j<this.columna; j++){
        var punto = new Punto(cvs,i*this.multiplicador,j*this.multiplicador);
        this.establecerPos(i,j,new Circulo(cvs,1,punto));
      }
    }
  }
  this.redefinirLimites = function(xi,yi,long,alt) {
    this.limites = new Rectangulo(xi,yi,long*this.multiplicador,alt*this.multiplicador);
  }

  this.obtenerPos = function(i,j) { return this.grilla[i][j];}
  this.obtenerLimites = function() { return this.limites;}
}
