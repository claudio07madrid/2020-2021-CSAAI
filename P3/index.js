console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 900;
canvas.height = 450;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Coordenadas del objeto
let x = 0;
let y = 10;

//-- Velocidades del objeto
let velx = 3;
let vely = 1;

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

//-- Funcion principal de animacion
function update(){
  console.log("test");

  //-- Algoritmo de animacion:
  //-- 1) Actualizar posicion del  elemento
  //-- (física del movimiento rectilineo uniforme)

   //-- Condicion de rebote en extremos verticales del canvas
   if (x < 0 || x >= (canvas.width - 10) ) {
    velx = -velx;
  }

  //-- Condición de rebote en extremos horizontales del canvas
  if (y <= 0 || y > 440) {
    vely = -vely;
  }

  //-- Actualizar la posición
  x = x + velx;
  y = y + vely;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujoraqueta();

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    ctx.arc(x, y, 10, 0,Math.PI*2);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  if(rightPressed && raquetaX < canvas.width - raquetaWidth){
      raquetaX += 7;
  }else if(leftPressed && raquetaX > 0) {
      raquetaX -= 7;
  }

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();