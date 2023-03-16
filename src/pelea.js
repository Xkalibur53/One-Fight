let ataqueJugador
let ataqueEnemigo
let vidasJugador  = 3
let vidasEnemigo = 3


function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonPersonajeJugador = document.getElementById('boton-personaje')
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)

    let botonGolpe = document.getElementById('boton-golpe')
    botonGolpe.addEventListener('click',ataqueGolpe)
    let botonCorte = document.getElementById('boton-corte')
    botonCorte.addEventListener('click',ataqueCorte)
    let botonPatada = document.getElementById('boton-patada')
    botonPatada.addEventListener('click',ataquePatada)
    let botonEspecial = document.getElementById('boton-especial')
    botonEspecial.addEventListener('click',ataqueEspecial)
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click',ataqueFuego)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click',reiniciarJuego)
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
function ataqueEspecial() {
    ataqueJugador = 'ESPECIAL'
    ataqueAleatorioEnemigo()
}
function ataqueFuego() {
    ataqueJugador = 'FUEGO'
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
        ataqueEnemigo = 'ESPECIAL'
    }else{
        ataqueEnemigo = 'FUEGO'
    }

    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueJugador == ataqueEnemigo){
        crearMensaje('EMPATASTE')
    }else if ((ataqueJugador == 'GOLPE' && ataqueEnemigo == 'CORTE') || (ataqueJugador == 'GOLPE' && ataqueEnemigo == 'ESPECIAL')){
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if ((ataqueJugador == 'CORTE' && ataqueEnemigo == 'PATADA') || (ataqueJugador == 'CORTE' && ataqueEnemigo == 'FUEGO')){
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if((ataqueJugador == 'PATADA' && ataqueEnemigo == 'ESPECIAL') || (ataqueJugador == 'PATADA' && ataqueEnemigo == 'GOLPE')){
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if((ataqueJugador == 'ESPECIAL' && ataqueEnemigo == 'FUEGO') || (ataqueJugador == 'ESPECIAL' && ataqueEnemigo == 'CORTE')){
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if ((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'GOLPE') || (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'PATADA')){
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        crearMensaje('PERDISTE')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()

}

function revisarVidas() {
    if(vidasEnemigo == 0){
        crearMensajeFinal('FELICITACIONES! GANASTE:D')
    }else if(vidasJugador == 0){
        crearMensajeFinal('Esta vez perdiste. Sigue intentando!')
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('resultado')
    let ataquesDelJugador = document.getElementById('ataques-del-jugador')
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('resultado')
    sectionMensajes.innerHTML = resultadoFinal


    let botonGolpe = document.getElementById('boton-golpe')
    botonGolpe.disabled = true
    let botonCorte = document.getElementById('boton-corte')
    botonCorte.disabled = true
    let botonPatada = document.getElementById('boton-patada')
    botonPatada.disabled = true
    let botonEspecial = document.getElementById('boton-especial')
    botonEspecial.disabled = true
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'
}

function seleccionarPersonajeJugador() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'
    let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
    sectionSeleccionarPersonaje.style.display = 'none'

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




function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
window.addEventListener('load',iniciarJuego)