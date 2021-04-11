//-- Contador de clicks de boton

console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM
const display = document.getElementById("display");
const boton = document.getElementById("boton");

parrafo = " Parrafo nuevo "
num = 1

//-- Contador de clicks
let cont = " ";

//-- Configurar retrollamada del boton
boton.onclick = () => {
  console.log("Click nrº");

  //-- Incrementar contador
  /*cont += parrafo;*/

  //-- Actualizar el display
  display.innerHTML = parrafo += " 1"
  
}