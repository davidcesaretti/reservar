
// Ya trabajamos con arreglos de una unica dimension, ahora subiremos un escalón e iremos por arreglos de dos dimensiones, es decir, 
// un arreglo de arreglos de enteros. En este caso, el objetivo es encontrar la suma de todos los elementos del arreglo.

// Ejemplos

// mdArray= [1,2,3,4]
// output: 10

// mdArraySum: [ [2,4] , [1], [4,2,1] ]
// output: 14


var mdArraySum=[ 2, [3,4], 5, [-3, [6 , [ 4,5 ] ] ] ];
// output: 26

var suma=0;

function suma(array1){
    let suma=0;
    for(let j=0;mdArray[j].length;j++){
        suma=suma+mdArray[j]
     }
     return suma;
}


for (let i=0; mdArray.length;i++){
    if(Array.isArray(mdArray[i])){
       suma=suma+suma(mdArray[i]);
    }else{
        suma=suma+mdArray[i];
    }
}





// Algunas consideraciones a tener en cuenta antes de implementar una solución.

// La suma inicial es cero
// Chequea cada elemento en el arreglo
// Si no es un arreglo agrégalo a la suma
// Si es un arreglo agrega la suma de todos sus elementos a la suma
// Devuelve el total
// Primer Alternativa
// Podemos empezar a implementar la solución, pero antes tenemos que resolver una pregunta:

// ¿Cómo podemos calcular la suma en los elementos de un sub-arreglo de un sub-arreglo? La respuesta es RECURSIÓN