let ataqueJugador
let ataqueEnemigo


function iniciarJuego() {
    let botonPersonajeJugador = document.getElementById('boton-personaje')
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)

    let botonGolpe = document.getElementById('boton-golpe')
    botonGolpe.addEventListener('click',ataqueGolpe)
    let botonCorte = document.getElementById('boton-corte')
    botonCorte.addEventListener('click',ataqueCorte)
    let botonPatada = document.getElementById('boton-patada')
    botonPatada.addEventListener('click',ataquePatada)
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click',ataqueFuego)
    let botonEspecial = document.getElementById('boton-especial')
    botonEspecial.addEventListener('click',ataqueEspecial)
}

function ataqueGolpe() {
    ataqueJugador = 'GOLPE'
    ataqueAleatorioEnemigo()
}
function ataqueCorte() {
    ataqueJugador = 'CORTE'
    ataqueAleatorioEnemigo()
}
function ataquePatada() {
    ataqueJugador = 'PATADA'
    ataqueAleatorioEnemigo()
}
function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueEspecial() {
    ataqueJugador = 'ESPECIAL'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,5)
    
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'GOLPE'
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'CORTE'
    }else if(ataqueAleatorio == 3){
        ataqueEnemigo = 'PATADA'
    }else if(ataqueAleatorio == 4){
        ataqueEnemigo = 'FUEGO'
    }else{
        ataqueEnemigo = 'ESPECIAL'
    }

    crearMensaje()
}

function crearMensaje() {
    let parrafo = document.createElement('p')
    let seccionMensajes = document.getElementById('mensajes')
    parrafo.innerHTML = 'atacó usando'+ataqueJugador
    seccionMensajes.appendChild(parrafo)
}



function seleccionarPersonajeJugador() {
    let spanPersonajeJugador = document.getElementById('personaje-jugador')
    let spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

    let inputLuffy = document.getElementById('luffy')
    let inputZoro = document.getElementById('zoro')
    let inputSanji = document.getElementById('sanji')
    let inputLaw = document.getElementById('law')
    let inputAce = document.getElementById('ace')

    
    if (inputLuffy.checked){
        spanPersonajeJugador.innerHTML = 'Monkey D. Luffy'
    }else if (inputZoro.checked){
        spanPersonajeJugador.innerHTML = 'Roronoa Zoro'
    }else if (inputSanji.checked){
        spanPersonajeJugador.innerHTML = 'Vinsmoke Sanji'
    }else if(inputLaw.checked){
        spanPersonajeJugador.innerHTML = 'Trafalgar D. Law'
    }else if(inputAce.checked){
        spanPersonajeJugador.innerHTML = 'Portgas D. Ace'
    }else{
        alert('Selecciona un personaje')
        return
    }

    seleccionarPersonajeEnemigo(spanPersonajeJugador, spanPersonajeEnemigo)
}




function seleccionarPersonajeEnemigo(spanPersonajeJugador, spanPersonajeEnemigo) {
    let personajeAleatorio
    // 1:Luffy, 2:Zoro, 3:Sanji, 4:Law, 5:Ace
    do {
        personajeAleatorio = aleatorio(1,5)
        if(personajeAleatorio == 1){
            spanPersonajeEnemigo.innerHTML = 'Monkey D. Luffy'
        }else if(personajeAleatorio == 2){
            spanPersonajeEnemigo.innerHTML = 'Roronoa Zoro'
        }else if(personajeAleatorio == 3){
            spanPersonajeEnemigo.innerHTML = 'Vinsmoke Sanji'
        }else if(personajeAleatorio == 4){
            spanPersonajeEnemigo.innerHTML = 'Trafalgar D. Law'
        }else{
            spanPersonajeEnemigo.innerHTML = 'Portgas D. Ace'
        }
    } while (spanPersonajeEnemigo.innerHTML == spanPersonajeJugador.innerHTML);

}




window.addEventListener('load',iniciarJuego)


function aleatorio(min,max){
	return Math.floor(Math.random()*(max-min+1)+min)
}