//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const btn_video1 = document.getElementById("btn_video1");
const btn_video2 = document.getElementById("btn_video2");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");


//-- Establecer las dimensiones de los vídeos
directo.width=700;
directo.height=400;
video1.width=350;  
video1.height=200;
video2.width=350;
video2.height=200;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "nosignal.gif";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://drive.google.com/uc?export=download&id=1GkDAsPsC9d6FDHJP6ADcPYGEdGV5YHli";
  video2.src="https://drive.google.com/uc?export=download&id=11kjC7Eb9FqrIkCp3GDU4WJtoxfWSvtmM";

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();

  //-- Y en silencio...
  video1.muted = true;
  video2.muted = true;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
};

//Boton de FUENTES-OFF
    btn_src_off.onclick = () => {
        directo.poster = TEST_IMAGE_URL;
        video1.poster = TEST_IMAGE_URL;
        video2.poster = TEST_IMAGE_URL;
        directo.src = null;
        video1.src = null;
        video2.src = null;
}
//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
};

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster=null;
};

//-- Botón de Selección de la cámara 2
btn_video2.onclick = () => {
    directo.src = video2.src;
    directo.currentTime = video2.currentTime;
    directo.play();
    directo.poster=null;
};
