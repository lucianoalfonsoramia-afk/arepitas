//inicializacion de variables
let TarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primeresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiemporegresivoID = null;
let timerinicial = timer

//apunto a documento html
let mostrarmovimientos= document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restante');

//generación de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function contarTiempo(){
    tiemporegresivoID = setInterval(() => {
        timer--;
        mostrartiempo.innerHTML = `tiempo: ${timer} segundos`
        if(timer == 0){
            clearInterval(tiemporegresivoID);
            Bloqueartarjetas();
        }
    }, 1000);
}
function Bloqueartarjetas(){
    for (let i = 0; i<=15; i++){
    let tarjetabloqueada = document.getElementById(i);
    tarjetabloqueada.innerHTML = numeros [i];
    tarjetabloqueada.disabled = true;
    }
}

//función principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    TarjetasDestapadas++;
    console.log(TarjetasDestapadas);

    if(TarjetasDestapadas == 1){
        //mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primeresultado = numeros[id];
    tarjeta1.innerHTML = primeresultado;

    //desahilitar el primer boton
    tarjeta1.disabled = true;
    }else if(TarjetasDestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        tarjeta2.innerHTML = segundoresultado;

        //deshabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarmovimientos.innerHTML = `movimientos: ${movimientos}`;
          if(primeresultado == segundoresultado){
            TarjetasDestapadas = 0;
            aciertos++;
            mostraraciertos.innerHTML = `aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiemporegresivoID)
                mostraraciertos.innerHTML = `aciertos: ${aciertos}👌`
                mostrartiempo.innerHTML = `felicidades! solo tardaste ${timerinicial - timer} segundos`
                mostrarmovimientos.innerHTML = `movimientos: ${movimientos}👌`
            }
            

        }else{
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                TarjetasDestapadas = 0;
            },800);
        }
    }

}