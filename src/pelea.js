const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonReiniciar = document.getElementById('boton-reiniciar')

const spanVictoriasJugador = document.getElementById('victorias-jugador')
const spanVictoriasEnemigo = document.getElementById('victorias-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
const spanPersonajeJugador = document.getElementById('personaje-jugador')
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')


const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')


const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')


let ataqueJugador = []
let ataqueEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let personajes = []
let opcionDePersonajes
let personajeJugador
let personajeJugadorObjeto
let ataquesPersonaje
let ataquesPersonajeEnemigo
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo

let botonGolpe
let botonCorte
let botonPatada
let botonEspecial
let botonFuego


let inputLuffy
let inputZoro
let inputSanji
let inputLaw
let inputAce

let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = '../assets/background.jpg'


class Personaje{
    constructor(nombreCompleto,nombre, foto, vida, fotoMapa, ancho = 70, alto = 100){
        this.nombreCompleto = nombreCompleto
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = aleatorio(100,380)
        this.y = aleatorio(100,260)
        this.ancho = ancho
        this.alto = alto
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarPersonaje(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let luffy = new Personaje('Monkey D. Luffy','luffy','./assets/luffy-removebg-preview.png',5,'../assets/luffy-map.png')
let zoro = new Personaje('Roronoa Zoro','zoro','./assets/zoro-removebg-preview.png',5,'../assets/zoro-map.png',90,110)
let sanji = new Personaje('Vinsmoke Sanji','sanji','./assets/sanji-removebg-preview.png',5,'../assets/sanji-map.png',100)
let law = new Personaje('Trafalgar D. Law','law','./assets/law-removebg-preview.png',5,'../assets/law-map.png',80)
let ace = new Personaje('Portgas D. Ace','ace','./assets/ace-removebg-preview.png',5,'../assets/ace-map.png')

let luffyEnemigo = new Personaje('Monkey D. Luffy','luffy','./assets/luffy-removebg-preview.png',5,'../assets/luffy-map.png')
let zoroEnemigo = new Personaje('Roronoa Zoro','zoro','./assets/zoro-removebg-preview.png',5,'../assets/zoro-map.png',90,110)
let sanjiEnemigo = new Personaje('Vinsmoke Sanji','sanji','./assets/sanji-removebg-preview.png',5,'../assets/sanji-map.png',100)
let lawEnemigo = new Personaje('Trafalgar D. Law','law','./assets/law-removebg-preview.png',5,'../assets/law-map.png',80)
let aceEnemigo = new Personaje('Portgas D. Ace','ace','./assets/ace-removebg-preview.png',5,'../assets/ace-map.png')



luffy.ataques.push(
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'💀', id:'boton-especial'}
)
zoro.ataques.push(
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'💀', id:'boton-especial'}
)
sanji.ataques.push(
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'💀', id:'boton-especial'}
)
law.ataques.push(
    {nombre:'💀', id:'boton-especial'},
    {nombre:'💀', id:'boton-especial'},
    {nombre:'💀', id:'boton-especial'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🔥', id:'boton-fuego'}
)
ace.ataques.push(
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'💀', id:'boton-especial'},
    {nombre:'💀', id:'boton-especial'}
)


personajes.push(luffy,zoro,sanji,law,ace)


function iniciarJuego() {
    personajes.forEach((personaje)=>{
        opcionDePersonajes = `
        <input type="radio" name="personaje" id=${personaje.nombre} />
        <label class="tarjeta-personaje" id="tarjeta-${personaje.nombre}" for=${personaje.nombre}>
            <p>${personaje.nombreCompleto}</p>
            <img src=${personaje.foto} alt="${personaje.nombreCompleto}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDePersonajes
    })
    inputLuffy = document.getElementById('luffy')
    inputZoro = document.getElementById('zoro')
    inputSanji = document.getElementById('sanji')
    inputLaw = document.getElementById('law')
    inputAce = document.getElementById('ace')

    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonReiniciar.addEventListener('click',reiniciarJuego)
}



function ataqueAleatorioEnemigo() {
    let ataqueAleatorioEnemigo = aleatorio(0,ataquesPersonajeEnemigo.length - 1)
    
    if(ataqueAleatorioEnemigo == 0 || ataqueAleatorioEnemigo == 1){
        ataqueEnemigo.push('GOLPE')
    }else if(ataqueAleatorioEnemigo == 2 || ataqueAleatorioEnemigo == 3){
        ataqueEnemigo.push('CORTE')
    }else if(ataqueAleatorioEnemigo == 4 || ataqueAleatorioEnemigo == 5){
        ataqueEnemigo.push('PATADA')
    }else if(ataqueAleatorioEnemigo == 6 || ataqueAleatorioEnemigo == 7){
        ataqueEnemigo.push('ESPECIAL')
    }else{
        ataqueEnemigo.push('FUEGO')
    }
    iniciarCombate()
}

function iniciarCombate() {
    if(ataqueJugador.length === 8 ){
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATASTE')
            spanVictoriasJugador.innerHTML = victoriasJugador
        }else if ((ataqueJugador[index] === 'GOLPE' && ataqueEnemigo[index] === 'CORTE') || (ataqueJugador[index] === 'GOLPE' && ataqueEnemigo[index] === 'ESPECIAL')){
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }else if ((ataqueJugador[index] === 'CORTE' && ataqueEnemigo[index] === 'PATADA') || (ataqueJugador[index] === 'CORTE' && ataqueEnemigo[index] === 'FUEGO')){
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }else if((ataqueJugador[index] === 'PATADA' && ataqueEnemigo[index] === 'ESPECIAL') || (ataqueJugador[index] === 'PATADA' && ataqueEnemigo[index] === 'GOLPE')){
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }else if((ataqueJugador[index] === 'ESPECIAL' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'ESPECIAL' && ataqueEnemigo[index] === 'CORTE')){
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }else if ((ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'GOLPE') || (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'PATADA')){
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }

    revisarVictorias()

}

function revisarVictorias() {
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('Esta vez fue un empate')
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('FELICITACIONES! GANASTE:D')
    }else{
        crearMensajeFinal('Esta vez perdiste. Sigue intentando!')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function seleccionarPersonajeJugador() {
    // sectionSeleccionarAtaque.style.display = 'flex'
    sectionSeleccionarPersonaje.style.display = 'none'

    if (inputLuffy.checked){
        spanPersonajeJugador.innerHTML = luffy.nombreCompleto
        personajeJugador = luffy.nombreCompleto
    }else if (inputZoro.checked){
        spanPersonajeJugador.innerHTML = zoro.nombreCompleto
        personajeJugador = zoro.nombreCompleto
    }else if (inputSanji.checked){
        spanPersonajeJugador.innerHTML = sanji.nombreCompleto
        personajeJugador = sanji.nombreCompleto
    }else if(inputLaw.checked){
        spanPersonajeJugador.innerHTML = law.nombreCompleto
        personajeJugador = law.nombreCompleto
    }else if(inputAce.checked){
        spanPersonajeJugador.innerHTML = ace.nombreCompleto
        personajeJugador = ace.nombreCompleto
    }else{
        alert('Selecciona un personaje')
        return
    }

    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    extraerAtaques(personajeJugador)
    seleccionarPersonajeEnemigo(spanPersonajeJugador, spanPersonajeEnemigo)
}

function extraerAtaques(personajeJugador) {
    let ataques
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombreCompleto) {
            ataques = personajes[i].ataques;
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque)=>{
        ataquesPersonaje = `
        <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesPersonaje
    })
    botonGolpe = document.getElementById('boton-golpe')
    botonCorte = document.getElementById('boton-corte')
    botonPatada = document.getElementById('boton-patada')
    botonEspecial = document.getElementById('boton-especial')
    botonFuego = document.getElementById('boton-fuego')
    botones = document.querySelectorAll('.boton-de-ataque')

}

function secuenciaAtaque() {
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if (e.target.textContent === '👊') {
                ataqueJugador.push('GOLPE')
                boton.style.background = '#3f969b60'
                boton.disabled = true
            }else if(e.target.textContent === '⚔️'){
                ataqueJugador.push('CORTE')
                boton.style.background = '#3f969b60'
                boton.disabled = true
            }else if(e.target.textContent === '🦵'){
                ataqueJugador.push('PATADA')
                boton.style.background = '#3f969b60'
                boton.disabled = true
            }else if(e.target.textContent === '💀'){
                ataqueJugador.push('ESPECIAL')
                boton.style.background = '#3f969b60'
                boton.disabled = true
            }else if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                boton.style.background = '#3f969b60'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}


function seleccionarPersonajeEnemigo(spanPersonajeJugador, spanPersonajeEnemigo) {
    let personajeAleatorio
    // 1:Luffy, 2:Zoro, 3:Sanji, 4:Law, 5:Ace
    do {
        personajeAleatorio = aleatorio(0,personajes.length - 1)
        spanPersonajeEnemigo.innerHTML = personajes[personajeAleatorio].nombreCompleto
    } while (spanPersonajeEnemigo.innerHTML == spanPersonajeJugador.innerHTML);
    ataquesPersonajeEnemigo = personajes[personajeAleatorio].ataques
    secuenciaAtaque()
}




function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas() {
    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    personajeJugadorObjeto.pintarPersonaje()
    luffyEnemigo.pintarPersonaje()
    zoroEnemigo.pintarPersonaje()
    sanjiEnemigo.pintarPersonaje()
    lawEnemigo.pintarPersonaje()
    aceEnemigo.pintarPersonaje()
    
}

function moverDerecha() {
    personajeJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    personajeJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    personajeJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    personajeJugadorObjeto.velocidadY = -5
}
function detenerMovimiento() {
    personajeJugadorObjeto.velocidadX = 0
    personajeJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mapa.width = 480
    mapa.height = 360
    personajeJugadorObjeto = extraerObjetoPersonaje()
    intervalo = setInterval(pintarCanvas,50)    
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function extraerObjetoPersonaje() {
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombreCompleto) {
            return personajes[i]
        }
    }
}

window.addEventListener('load',iniciarJuego)