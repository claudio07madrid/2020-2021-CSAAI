//-- Contador de clicks de boton

console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM
const display = document.getElementById("display");
const boton_1 = document.getElementById("boton_1");
const boton_2 = document.getElementById("boton_2");

parrafo = " Parrafo introducido "

//-- Contador de clicks
let cont = " ";

//-- Configurar retrollamada del boton
boton_1.onclick = () => {
  console.log("Nrº de clicks boton 1");


  //-- Incrementar contador
  /*cont += parrafo;*/

  //-- Actualizar el display
  display.innerHTML = parrafo += " 1"
  
}

boton_2.onclick = () =>{
  console.log("Nrº de clicks boton 2")
  display.innerHTML += " 2"
}