console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 900;
canvas.height = 450;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//Variables que influyen en la colisión
var radiobola = 10;//radio de la pelota
var x = canvas.width/2;
var y = canvas.height - 30;
//velocidades
var velx = 2;
var vely = -2;

//Dibujamos la bola
function dibujobola(){
    ctx.beginPath();
    ctx.arc(x, y, radiobola, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//Definimos el movimiento de la raqueta
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

function dibujoraqueta(){
    ctx.beginPath();
    ctx.rect(raquetaX, canvas.height-raquetaHeight, raquetaWidth, raquetaHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//Variables necesarios para los ladrillos
const ladrillo = {
    f: 5, //filas
    c: 9, //columnas
    alt: 20, //altura de ladrillo
    anch: 30, //anchura de ladrillo
    padding: 10, //espacio alrededor del ladrillo
    visible: true //estado del ladrillo: activo o no
}


//-- Funcion principal de animacion
function update(){
  console.log("test");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujoraqueta();
  dibujobola();


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


for (let i = 0; i < ladrillo.f; i++){
    for(let j = 0; j < ladrillo.c; j++){
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


  //Definimos el movimiento de la pelota

  if(x + velx > canvas.width - radiobola || x + velx < radiobola){
      velx = -velx;
  }
  if(y + vely < radiobola) {
      vely = -vely;
  }else if(y + vely > canvas.height - radiobola - 10){
      if(x > raquetaX && x <raquetaX + raquetaWidth){
          vely = -vely;
      }
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