console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
//-- Definir el tamaño del canvas
canvas.width = 950;
canvas.height = 450;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//Variables que influyen en la colisión
var radiobola = 10;//radio de la pelota
var x = canvas.width/2;//Punto de inicio de la bola (coordenada x)
var y = canvas.height - 10;//Punto de inicio de la bola (coordenada y)
//velocidades
var velx = 3;
var vely = -3;

//Dibujamos la bola
function dibujobola(){
    ctx.beginPath();
    ctx.arc(x, y, radiobola, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//Definimos el movimiento de la raqueta. Lo haremos con los botones de flechas del teclado
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Función para cuando se mantiene pulsado el botón
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }else if(e.keyCode == 37){
        leftPressed = true;
    }
}
//Función para cuando se levanta el dedo del botón
function keyUpHandler(e) {
    if(e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode == 37){
        leftPressed = false;
    }
}

//Definimos la raqueta
var raquetaHeight = 10;
var raquetaWidth = 75;
var raquetaX = (canvas.width - raquetaWidth)/2;

//Función que dibuja la raqueta
function dibujoraqueta(){
    ctx.beginPath();
    ctx.rect(raquetaX, canvas.height-raquetaHeight, raquetaWidth, raquetaHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//Variables necesarios para los ladrillos
const ladrillo = {
    f: 6, //filas
    c: 10, //columnas
    alt: 20, //altura de ladrillo
    anch: 70, //anchura de ladrillo
    padding: 20, //espacio alrededor del ladrillo
    visible: true //estado del ladrillo: activo o no
}

//Estructura de los ladrillos, inicialmente está vacío
const ladrillos = [];


//Recorrer todas las filas
for (let i = 0; i < ladrillo.f; i++){
    ladrillos[i] = []; //Inicializa la fila. Las filas son Arrays que inicialmente estás vacíos.
    
    for (let j = 0; j < ladrillo.c; j++){
        ladrillos[i][j] = {
            x: (ladrillo.anch + ladrillo.padding) * j,
            y:(ladrillo.alt + ladrillo.padding) * i,
            anch: ladrillo.anch,
            alt: ladrillo.alt,
            padding: ladrillo.padding,
            visible: ladrillo.visible
        };
    }
}

//Variables para las vidas y la puntuación
var numVidas = 1;
var puntuación = 0;

//Función para mostrar las vidas
function lifes(){
    ctx.fillStyle = "white";
    ctx.fillText("Vidas:" +numVidas, 20, 25);
    ctx.font = "24px Arial";
}

//Función para mostrar la puntuación
function points(){
    ctx.fillStyle = "white";
    ctx.fillText("Puntuación:" + puntuación, 780, 25);
    ctx.font = "24px Arial";
    
}

//-- Funcion principal de animacion
function update(){
  console.log("test");
  document.getElementById("gameovergif").style.display = "none";
  

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujoraqueta();
  dibujobola();
  lifes();
  points();
//Bucle para pintar los ladrillos
//Recorre todas las filas y columnas
for (let i = 1; i < ladrillo.f; i++){//Inicializo en 1 en vez de en 0 para poder despegar los ladrillos del borde
    for(let j = 1; j < ladrillo.c; j++){////Inicializo en 1 en vez de en 0 para poder despegar los ladrillos del borde
      //si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible){
          ctx.beginPath();
          ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, ladrillo.anch, ladrillo.alt);
          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.closePath();
      }
    }
}

//Bucle para la colisión de la pelota con los ladrillos.
for (let i = 1; i < ladrillo.f; i++) {//Inicializo en 1 porque igual lo hice en el bucle de arriba
    for (let j = 1; j < ladrillo.c; j++) {
      if (ladrillos[i][j].visible) {
        if ((y >= ladrillos[i][j].y) && (y <= (ladrillos[i][j].y + 20))){
          if ((x >= ladrillos[i][j].x) && (x <= (ladrillos[i][j].x + 70))){
            ladrillos[i][j].visible = false;
            vely = -vely;
            puntuación += 1;
          }
        }
      }
    }
  }

  //Definimos el movimiento de la pelota y que ocurre cuando choca con la raqueta

  if(x + velx > canvas.width - radiobola || x + velx < radiobola){
      velx = -velx;
  }
  if(y + vely < radiobola) {
      vely = -vely;
  }else if(y + vely > canvas.height - radiobola){
      if(x > raquetaX && x <raquetaX + raquetaWidth){
          vely = -vely;
      }
  }

  //Definimos lo que ocurre cuando la pelota toca el suelo (pérdida de vida)

  if (y >= canvas.height){
      velx = 3;
      vely = -3;
      x = canvas.width/2;
      y = canvas.height - 10;
      raquetaX = (canvas.width - raquetaWidth)/2;
      numVidas -= 1;
  }else if(numVidas == 0){
      velx = 0;
      vely = 0;
      raquetaX = (canvas.width - raquetaWidth)/2;
      document.getElementById("canvas").style.display = "none";
      document.getElementById("gameovergif").style.display = "block";
  }

  if(rightPressed && raquetaX < canvas.width - raquetaWidth){
      raquetaX += 7;
  }else if(leftPressed && raquetaX > 0) {
      raquetaX -= 7;
  }

  //-- 4) Volver a ejecutar update cuando toque
  x += velx;
  y += vely;
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();