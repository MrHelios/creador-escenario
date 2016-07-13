// En la documentacion linea 27.
function Area(canvas,xi,yi,xf,yf) {
  Tablero.call(this,canvas);

  this.xi = xi;
  this.yi = yi;
  this.xf = xf;
  this.yf = yf;
}

// Verifica que el punto este entre los punto de vertices del area.
Area.prototype.estaEnEscenario = function(px,py,area) {
    return (area.xi<=px && (area.xf + area.xi)>px && area.yi<=py && (area.yf + area.yi)>py)
  }

Area.prototype.pintar = function(area) {
    var p = new Punto(area.ID, area.xi+5, area.yi+5);
    var r = new Rectangulo(area.ID, p, area.xf-5, area.yf-5);
    r.color = "white";
    r.pintar();
  }

Area.prototype.colorear = function(area, color) {
    var p = new Punto(area.ID, area.xi, area.yi);
    var r = new Rectangulo(area.ID, p, area.xf, area.yf);
    r.color = color;
    r.pintar();
  }


// En la documentacion linea 43.
// IMPORTANTE: Mejorar esta grilla.
function Escenario(cvs,xi,yi,xf,yf,multi) {
  Area.call(this,cvs,xi,yi,xf,yf);

  this.multiplicador = 10;
  // xi: 15
  this.fila_inicio = this.xi/this.multiplicador;
  // yi: 6
  this.columna_inicio = this.yi/this.multiplicador;
  this.fila = this.xf/this.multiplicador;
  this.columna = this.yf/this.multiplicador;

  var p = new Punto(this.ID,(this.fila_inicio-1)*10,(this.columna_inicio-1)*10);
  this.limites = new Rectangulo(this.ID,p,this.xf,this.yf);

  this.grilla = new Array();
  for(var i=0;i<=this.fila;i++) {
    this.grilla.push(new Array());
  }

  this.establecerPos = function(i,j,obj) {
    this.grilla[i][j] = obj;
  }

  this.dibujar = function() {
    for(var i=0; i<this.fila; i++) {
      for(var j=0; j<this.columna; j++) {
        this.obtenerPos(i,j).dibujar();
      }
    }
  }

  this.dibujarParte = function(i0,j0,ifinal,jfinal) {
    if(i0<0) i0=this.fila_inicio;
    else if(ifinal>this.fila) ifinal=this.fila;

    if(j0<0) j0=this.columna_inicio;
    else if(jfinal>this.columna) jfinal=this.columna;

    for(var i=i0; i<ifinal; i++) {
      for(var j=j0; j<jfinal; j++) {
        this.obtenerPos(i,j).dibujar();
      }
    }
  }

  this.establecerGrilla = function() {
    for(var i=0; i<this.fila; i++){
      for(var j=0; j<this.columna; j++){
        var punto = new Punto(cvs,i*this.multiplicador+150,j*this.multiplicador+60);
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
