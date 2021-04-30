console.log("Ejecutando juego");

const canvas = document.getElementById("canvas");
const reset = document.querySelector(".reset");
const marcador = document.querySelector(".score");

canvas.width = 1000;
canvas.height = 500;

const ctx = canvas.getContext("2d");

//-- Coordenadas del objeto
let x = 0;
let y = 10;

//-- Velocidades del objeto
let velx = 3;
let vely = 1;

//-- Funcion principal de animacion
function update()
{
    dibujarbloques(); 

  console.log("test");
  //-- Algoritmo de animacion:
  //-- 1) Actualizar posicion del  elemento
  //-- (física del movimiento rectilineo uniforme)

   //-- Condicion de rebote en extremos verticales del canvas
   if (x < 0 || x >= (canvas.width - 20) ) {
    velx = -velx;
  }

  //-- Condición de rebote en extremos horizontales del canvas
  if (y <= 0 || y > 480) {
    vely = -vely;
  }

  //-- Actualizar la posición
  x = x + velx;
  y = y + vely;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    ctx.rect(x, y, 20, 20);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);

    ctx.font = "20px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("Score:", 10, 30);
    ctx.fillText("Lifes:",900,30)
}


var filas = 5;
var columnas = 9;
var ancho = 50;
var alto = 20;
var relleno = 20;
var izq = 35;
var arriba = 30;

var bloques = [];

function generarbloques(){
    for (let c = 0; c < columnas; c++) {
        bloques[c] = [];
        for (let f = 0; f < filas; f++){
            bloques[c][f] = {x: 0, y: 0, status: 1};
        }
    }
}

function dibujarbloques(){
    for (var c = 0; c < columnas; c++){
       for (var f = 0; f < filas; f++){
            if(bloques[c][f].status === 1){
                var bloqueX = c * (ancho + relleno) + izq;
                var bloqueY = f * (ancho + relleno) + arriba;
                bloques[c][f].x = bloqueX;
                bloques[c][f].y = bloqueY;
                ctx.beginPath();
                ctx.rect(bloqueX, bloqueY, ancho, alto);
                ctx.fillStyle = "#230c33";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//-- ¡Que empiece la función!
generarbloques();
update();
