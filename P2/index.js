console.log("Ejecutando JS...");

//--Los id que he creado en el archivo html, los necesito utilizar en el js,
//--por tanto los defino aquí a través del getElementById

display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("delete")
contenedor = document.getElementById("contenedor")
document.getElementById('caja').style.display = 'none';

//--Aquí creo arrays a partir de las clases creadas en html

let digitos = document.getElementsByClassName("digito");
let operando = document.getElementsByClassName("operando");

//--Esta función me permite abrir la interfaz de la calculadora a partir
//-- pulsando el botón en la interfaz inicial
function Abrir_Calculadora() {
    document.getElementById('caja').style.display = 'inline-block';
    elementoinicial = contenedor.parentNode
    elementoinicial.removeChild(contenedor)
}

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}
 
 //-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;   

 

//-- Función de retrollamada de los digitos
function digito(valor)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = valor;

        //-- Pasar a los siguientes estados
        estado = ESTADO.OP1;

    } else if (estado == ESTADO.OP1 ) {
        display.innerHTML += valor;
    } else if (estado == ESTADO.OPERATION) {
        display.innerHTML += valor;
        estado = ESTADO.OP2;
    } else if (estado == ESTADO.OP2) {
        display.innerHTML += valor;
    }

}


//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for(i=0; i<digitos.length; i++) {
    digitos[i].onclick = (ev) => {
        console.log("Leyendo digito")
        digito(ev.target.value)
    }
}
//--Establecer la misma función de retrollamada
//-- para todos los botones de tipo operando
for(i=0; i<operando.length; i++){
    operando[i].onclick=(ev)=>{
        if(estado == ESTADO.OP1){
            operacion(ev.target.value);
            console.log("Operacion")
        }
    }
}

//--Función que permite realziar la operación
//--Si estado es distindo a ESTADO.OPERATION pero se le 
//--añade un operador, el estado estará en ESTADO.OPERATION
function operacion(operation){
    if(estado != ESTADO.OPERATION) {
        display.innerHTML += operation;
        estado = ESTADO.OPERATION;
    }
}

//-------- Resto de funciones de retrollamada

//-- Evaluar la expresion
igual.onclick = () => {
  

        display.innerHTML = eval(display.innerHTML);
        estado = ESTADO.OP1;
        ans.value = display.innerHTML;
   
    //-- Calcular la expresión y añadirla al display
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
  display.innerHTML = "0";
  console.log("clear")
  estado = ESTADO.INIT;
}

//--Borrar el último dígito que hemos introducido
borrar.onclick = () => { 
    display.innerHTML = display.innerHTML.slice(0,-1);
    
}
//--Función que realiza la raíz cuadrada
sqrt.onclick = () => {
    display.innerHTML = Math.sqrt(display.innerHTML);
}

//--Función que permite el "answer", es decir, que 
//--puedes escribir el resultado obtenido con la última 
//--operación hecha
ans.onclick = () => {
    display.innerHTML += ans.value;
    estado = ESTADO.OP1;
 }