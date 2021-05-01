console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 900;
canvas.height = 450;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//Variables que influyen en la colisión
var radiobola = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var difx = 2;
var dify = -2;

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
var raquetaHeight = 15;
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujoraqueta();
  dibujobola();

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