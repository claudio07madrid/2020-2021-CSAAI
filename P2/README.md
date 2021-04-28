 # Práctica 2
Esta calculadora tiene dos interfaces:
 -La interfaz inicial, que muestra el Iphone y sus aplicaciones básicas, donde sólo podemos interactuar con la calculadora
 -La interfaz de la calculadora una vez pinchado el botón, donde podemos realizar las operaciones.

Para pasar a la interfaz de la calculadora, tenemos que pinchar en el icono de la aplicación de Calculator.
La interfaz de la calculadora tiene los siguientes botones:
 - AC: Es la función clear, que pone la calculadora en su estado inicial
 - C: botón de borrar el último dígito
 - ^ : botón de potencia, elevar a x número
 - Botones de operaciones: división, multiplicación, resta y suma
 - = : botón del igual, evalúa la expresión
 - √ : botón de la raíz cuadrada
 ANS: botón de answer, escribe el resultado de la última expresión evaluada
 - Digitos 1 - 9 y el . para operaciones con números reales
 -Además, abajo a la derecha, debajo del igual, está el botón de volver, que permite volver a la interfaz inicial.

Esta calculadora está programada por estados:
Estado inicial - Operador 1 - Operando - Operando 2 - Evaluación expresión

Esto impide por ejemplo esta expresión: 1 + 1 + 1.
En todo caso, sería 1 + 1, evaluamos, y después sumamos el otro 1.

