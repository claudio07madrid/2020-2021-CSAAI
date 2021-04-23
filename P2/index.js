console.log("Ejecutando JS...");

display = document.getElementById("display")
operando = document.getElementsByClassName("operando")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
punto = document.getElementById("punto")

digitos = document.getElementsByClassName("digito")

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

 //-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (i=0; i<digitos.lenght; i++) {
    digitos[i].onclick = digito;
}

//-- Función de retrollamada de los digitos
function digito(ev)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = ev.target.value;

        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;

    } else if (estado == ESTADO.OP1 ) {
        display.innerHTML += ev.target.value;
    } else if (estado == ESTADO.OPERATION) {
        display.innerHTML += ev.target.value;
        estado = ESTADO.OP2;
    } else if (estado == ESTADO.OP2) {
        display.innerHTML += ev.target.value;
    }

}




//-------- Resto de funciones de retrollamada

//-- Operación de sumar
operando.onclick = (ev) => {

    //-- Insertar simbolo de sumar
    display.innerHTML += ev.target.value;

    //-- ¡Ojo! Aquí se inserta el + siempre!
    //-- Para que la calculadora funcione bien
    //-- sólo se debe permitir insertar el operador
    //-- en el estado OP1, y debe cambiar el estado
    //-- a OPERATION (según el diagrama de estados)
  
}

//-- Evaluar la expresion
igual.onclick = () => {
  
    if(estado == ESTADO.OP1 || estado == ESTADO.OP2){
        display.innerHTML = eval(display.innerHTML);
        estado = ESTADO.OP1;
    }
    //-- Calcular la expresión y añadirla al display
    
    //-- ¡Ojo! Aquí se hace siempre!
    //-- Sólo se debe permitar que eso se haga
    //-- si se está en el estado final (OP2)
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
  display.innerHTML = "0";
  console.log("clear")
  estado = ESTADO.INIT;
}