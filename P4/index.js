console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagen1')
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslirojo = document.getElementById('deslizadorrojo');
const desliverde = document.getElementById('deslizadorverde');
const desliazul = document.getElementById('deslizadorazul');



//-- Valor del deslizador
const rangerojo_value = document.getElementById('rangerojo_value');
const rangeverde_value = document.getElementById('rangeverde_value');
const rangeazul_value = document.getElementById('rangeazul_value');

const gris = document.getElementById('gris');
const filtrnegativo = document.getElementById('negativo')

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada

img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el numero total de elementos en el array
  console.log("Tamaño de data: " + data.length)

  //-- El número total de pixeles es la altura por la anchura
  npixels = canvas.width * canvas.height
  console.log("Anchura (en pixeles): " + canvas.width)
  console.log("Altura (en pixeles): " + canvas.height)
  console.log("Pixeles totales: " + npixels)

  //-- Puesto que cada pixel ocupa 4 bytes, el array de píxeles
  //-- tiene un tamaño de 4 * numero de pixeles
  console.log("Total de datos de la imagen: " + npixels * 4)

};

deslirojo.oninput = () => {
    color();
}

desliverde.oninput = () => {
    color();
}

desliazul.oninput = () => {
    color();
}

//-- Funcion de retrollamada del deslizador
function color(){
    //-- Mostrar el nuevo valor del deslizador
    rangerojo_value.innerHTML = deslirojo.value;
    rangeverde_value.innerHTML = desliverde.value;
    rangeazul_value.innerHTML = desliazul.value;
  
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
  
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
  
    //-- Obtener el umbral de rojo del desliador
    umbralrojo = deslirojo.value
    umbralverde = desliverde.value
    umbralazul = desliazul.value
  
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbralrojo)
        data[i] = umbralrojo;

      if(data[i + 1] > umbralverde)
        data[i + 1] = umbralverde;
    
      if (data[i + 2] > umbralazul)
        data[i + 2] = umbralazul  
    }
  
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
}

function grises(){
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    //-- Calcular el brillo para CADA PIXEL y ponerselo por igual a cada componente
    for (var i = 0; i < data.length; i+=4) {
      umbralrojo = data[i];
      umbralverde = data[i+1];
      umbralazul = data[i+2];
      brillo = (3 * umbralrojo + 4 * umbralverde + umbralazul)/8
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
  }
  function negativo(){
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
  
    for ( var i = 0; i < data.length; i+=4 ) {
        umbralrojo = data[i];
        umbralverde = data[i+1];
        umbralazul = data[i+2];
  
        data[i] = 255 - umbralrojo;
        data[i+1] = 255 - umbralverde;
        data[i+2] = 255 - umbralazul;
    }
    ctx.putImageData(imgData, 0, 0 );
  }
console.log("Fin...");

gris.onclick = () => {
    grises();
}

filtrnegativo.onclick = () => {
  negativo();
}


