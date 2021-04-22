console.log("Ejecutando JS...");

display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")
punto = document.getElementById("punto")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
    COMA: false,
}
 
//-- Crea un array con todos los elementos de la clase operacion
let operando = document.getElementsByClassName("operando");
//--Crea un array con todos los elementos de la clase digito
let digitos = document.getElementsByClassName("digito")


 //-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
let estado = ESTADO.INIT;   

 //-- Recorrer el array de los digitos del 0 al 9
for (i=0; i<digitos.lenght; i++){
     digitos[i].onclick = (ev) => {
         digito(ev.target.value);
    }
}


//-- Función de retrollamada de los digitos
function digito(botones)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra
   
    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {
        display.innerHTML = botones;
        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;
        console.log(estado, "operador 1");

    } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION) {
       
        //--En cualquier otro estado lo añadimos
        display.innerHTML += botones;
        if (estado == ESTADO.OPERATION) {
            estado = ESTADO.OP2;
            console.log(estado, "operador 2");
            ESTADO.COMA = false;
        }
    } 
    
}

//--Array de los operandos
for (i=0; i<operando.lenght; i++){

    operando[i].onclik = (ev)=> {
        if (estado == ESTADO.OP1){
            display.innerHTML += ev.target.value;
            estado = ESTADO.OPERATION;
            console.log(estado, "operando");
            ESTADO.COMA = true;
        }
    }
}

//-- Evaluar la expresion
igual.onclick = () => {
  
    //-- Calcular la expresión y añadirla al display
    display.innerHTML = eval(display.innerHTML);

    //-- ¡Ojo! Aquí se hace siempre!
    //-- Sólo se debe permitar que eso se haga
    //-- si se está en el estado final (OP2)
  
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}



