*Escenario-Creador: Version 0.0.1*
*Clases y metodos en el escenario-creador.*
*Con sus parametros y retornos.*

*Documentacion Escenario-Creador:*

* Clase Tablero:
Uso: Tener referencia al elemento id y sus propiedades.

*Constructor(canvas):* El parámetro es el id del tag canvas.
No hereda de ninguna clase.

*Atributos:*
lienzo: Lugar donde se almacena el elemento canvas.
id: Nombre del id del elemento.
long: Longitud del elemento.
altura: Altura del elemento.

*Consultas:*
obtenerID: Retorna el id.
obtenerLong: Retorna la longitud.
obtenerAltura: Retorna la altura.

*Prototype:*
limpiar: Pinta un rectangulo blanco de las dimensiones del id.

* Clase Area:
Uso: Genera un area de trabajo dentro del id.

Hereda de la clase Tablero.
*Constructor(canvas,xi,yi,xf,yf):*

*Atributos:*
canvas: es el id del tag.
xi, yi, xf, yf: Son cuatro vertices del area donde se trabajara.

*Prototype:*
estaEnEscenario(xi,xf,area): Verifica si el punto suministrado esta en el area.
pintar(area): Pinta la area de blanco.
colorear(area,color): Pinta la area del color que se suministra.


* Clase Escenario:
Uso: Crea una matriz de puntos sobre un area.

Hereda de la clase Area.
*Constructor(cvs,xi,yi,xf,yf,multi):*

*Atributos:*
multiplicador: La distancia de cada punto del grillado.
grilla: Matriz de puntos a traves del area.
limite: Rectangulo que define el limete de la grilla.

*Metodos:*
establecerPos(i,j,obj): Agrega un objeto al casillero i,j.
dibujar(): Dibuja cada punto de la grilla.
dibujarParte(i0,j0,if,jf): Dibuja parte de la grilla, como metodo optimizador.
establecerGrilla(): Cada punto es dibujado como un circulo de radio=1.
redefinirLimites(xi,yi,long,altura): Redefine el limite de la grilla.
obtenerPos(i,j): Retorna la posicion de la grilla.
obtenerLimite(): Retorna el limite.

* Clase Coleccion
Uso: Se utiliza para almacenar objetos que tenga el metodo dibujar.

No hereda de ninguna clase.
Constructor().

*Atributos:*
objetos: Un arreglo con todo los objetos.
cant: Lleva la cuenta de todo los objetos.

*Metodos:*
insertar(obj): Agrega un objeto al final del ultimo objeto.
eliminar(obj): Elimina un objeto y comprime el arreglo.
dibujarTodo: Recorre el arreglo ejecutando el metodo dibujar de cada objeto.

*Prototype:*
tipoInstancia: Retorna el indice de la instancia de un objeto.

* Clase coleccionEscenario
Uso: Se utiliza especialmente para del escenario.

Hereda de Coleccion.
Contructor():

*Metodo:*
dibujarOpt(): Dibuja parte del grillado.

* Clase Oyente
Uso: Detecta los click focaliza el movimiento del mouse en una zona.

Hereda de la clase Tablero.
Constructor(cvs):

*Atributos:*
activo:(boolean) Indica si hubo click en la zona.
tecla: Que tipo de tecla fue seleccionada.
movmousex: Posicion en x.
movmousey: Posicion en y.
seleccion_objeto: indice del objeto seleccionado.
seleccion_enlace: indice del enlace seleccionado.

*Metodos:*
escucharTeclado(): Habilita escuchar teclado.
detectorMovMouse(): Habilita escuchar mouse movimiento.
escucharMouse(): Habilita escuchar click del mouse.
deshabilitarSeleccion(): Desabilita toda Seleccion.

* Clase IA
No hereda de ninguna clase.
Constructor():

*Metodos:*
reubicar(posx, posy): Retorna el punto reubicado.
permitirDibujo(esc, estado_click, x, y): Retorna si puede permitir dibujo.
empezarDibujo(coleccion, cvs, x, y, xf, yf, tecla): Empieza el dibuja de una figura.
finalizarDibujo(coleccion, coleccion_monitor, cvs, x, y, tecla): Finaliza el dibuja de una figura.
seleccionEnlace(coleccion, x, y): Retorna el indice de la coleccion.
obtenerObjetoEnlace(coleccion_monitor,coleccion_obj,pos): Pos es el indice del tipo de instancia.
pintarSeleccion(coleccion, monitor, i): Pinta el objeto seleccionado.

*Prototype:*
dibujar(cvs, coleccion, coleccion_monitor, clickx, clicky, mousex, mousey, tecla): Dibuja la figura segun la tecla.
reubicarCuentas(numero): Retorna el nuevo valor.
opuesto(boolean): Retorna el opuesto.
instancias(): Es una variable con toda las instancias.

* Clase Socket

No hereda ninguna clase.
Constructor():

*Atributos:*
socket: io()
ultimo_enviado: Arreglo de lo ultimo enviado.

*Metodos:*
onLinea: Agrega todas las lineas en el dibujo.
onRect: Agrega todos los rectangulos en el dibujo.

*Prototype:*
recolectar(obj): Crea JSON de lineas y rectangulo.
comparar(nuevo,database): Compara el ultimo envio con el nuevo.
enviar(objeto,s): s es un objeto de clase Socket.

*miFrame: Version 0.0.1*
*Clases y metodos en el algoritmo miFrame*
*Con sus parametros y retornos.*

*Documentacion miFrame:*
