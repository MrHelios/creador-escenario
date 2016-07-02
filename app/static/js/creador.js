var activo = false;
var cvs = "canvas";
var tablero = new Tablero(cvs);
var escenario = new Escenario(cvs,150,60,950,550);
var obj = new coleccionEscenario();

var monitor_objetos = new Area(cvs,0,0,138,550);
var monitor_obj = new Coleccion();

var menu_servidor = new Area(cvs,140,0,100,50);
Area.prototype.colorear(menu_servidor, 'red');

var socket = new Socket();

escenario.establecerGrilla();
obj.insertar(escenario.obtenerLimites());
obj.insertar(escenario);

var o = new Oyente(cvs);
o.detectorMovMouse();
o.escucharMouse();
o.escucharTeclado();

var inteligencia = new IA();

// Solo se ejecuta en la inicializacion.
obj.dibujarTodo();
