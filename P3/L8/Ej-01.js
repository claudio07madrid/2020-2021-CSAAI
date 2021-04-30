console.log("Ejecutando juego");

const canvas = document.getElementById("canvas");

canvas.width = 1000;
canvas.height = 500;

const ctx = canvas.getContext("2d");

ctx.font = "20px Arial";
ctx.fillStyle = 'white';
ctx.fillText("Score:", 10, 30);

ctx.font = "20px Arial";
ctx.fillStyle = 'white';
ctx.fillText("Lifes:", 900, 30);

for (i<300; j<300;){
ctx.beginPath()
    ctx.rect(i * 10,j * 10, 80, 30);
    ctx.fillStyle = 'lightblue';
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
ctx.closePath();
}

  




