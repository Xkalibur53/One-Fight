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


let jugadorId = null
let personajesEnemigos = []
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
mapaBackground.src = './assets/background.jpg'
let alturaCalcular
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 480
if(anchoDelMapa>anchoMaximoMapa){anchoDelMapa = anchoMaximoMapa-20}
alturaCalcular = anchoDelMapa * 600/800
mapa.height = alturaCalcular
mapa.width = anchoDelMapa

class Personaje{
    constructor(nombreCompleto,nombre, foto, vida, fotoMapa, ancho = 40, alto = 40, id=null){
        this.id = id
        this.nombreCompleto = nombreCompleto
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = ancho
        this.alto = alto
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
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

let luffy = new Personaje('Monkey D. Luffy','luffy','./assets/luffy-removebg-preview.png',5,'./assets/luffy-map.png')
let zoro = new Personaje('Roronoa Zoro','zoro','./assets/zoro-removebg-preview.png',5,'./assets/zoro-map.png')
let sanji = new Personaje('Vinsmoke Sanji','sanji','./assets/sanji-removebg-preview.png',5,'./assets/sanji-map.png')
let law = new Personaje('Trafalgar D. Law','law','./assets/law-removebg-preview.png',5,'./assets/law-map.png')
let ace = new Personaje('Portgas D. Ace','ace','./assets/ace-removebg-preview.png',5,'./assets/ace-map.png')



const LUFFY_ATAQUES = [
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'💀', id:'boton-especial'}
]
const ZORO_ATAQUES = [
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'💀', id:'boton-especial'}
]
const SANJI_ATAQUES = [
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'💀', id:'boton-especial'}
]
const LAW_ATAQUES = [
    {nombre:'💀', id:'boton-especial'},
    {nombre:'💀', id:'boton-especial'},
    {nombre:'💀', id:'boton-especial'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'🔥', id:'boton-fuego'}
]
const ACE_ATAQUES = [
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'👊', id:'boton-golpe'},
    {nombre:'🦵', id:'boton-patada'},
    {nombre:'⚔️', id:'boton-corte'},
    {nombre:'💀', id:'boton-especial'},
    {nombre:'💀', id:'boton-especial'}
]

luffy.ataques.push(...LUFFY_ATAQUES)
zoro.ataques.push(...ZORO_ATAQUES)
sanji.ataques.push(...SANJI_ATAQUES)
law.ataques.push(...LAW_ATAQUES)
ace.ataques.push(...LAW_ATAQUES)




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

    unirseAlJuego() 
}

function unirseAlJuego() {
    fetch('http://localhost:8080/unirse')
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
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

    seleccionarPersonaje(personajeJugador)

    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    extraerAtaques(personajeJugador)
}

function seleccionarPersonaje(personajeJugador) {
    fetch(`http://localhost:8080/personaje/${jugadorId}`,{
        method: 'post',
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            personaje: personajeJugador
        })
    })
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


function seleccionarPersonajeEnemigo(enemigo) {
    spanPersonajeEnemigo.innerHTML = enemigo.nombreCompleto
    ataquesPersonajeEnemigo = enemigo.ataques
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

    enviarPosicion(personajeJugadorObjeto.x,personajeJugadorObjeto.y)

    personajesEnemigos.forEach(function(personaje){
        personaje.pintarPersonaje()
        revisarColision(personaje)
    })
    
    if(personajeJugadorObjeto.velocidadX !== 0 || personajeJugadorObjeto.velocidadY !== 0){
        revisarColision(luffyEnemigo)
        revisarColision(zoroEnemigo)
        revisarColision(sanjiEnemigo)
        revisarColision(lawEnemigo)
        revisarColision(aceEnemigo)
    }
}

function enviarPosicion(x,y) {
    fetch(`http://localhost:8080/personaje/${jugadorId}/posicion`,{
        method : "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function ({enemigos}){
                        console.log(enemigos)
                        personajesEnemigos = enemigos.map(function (enemigo){
                            let personajeEnemigo = null
                            const personajeNombre = enemigo.personaje.nombre || ""
                            if (personajeNombre === 'Monkey D. Luffy'){
                                personajeEnemigo = new Personaje('Monkey D. Luffy','luffy','./assets/luffy-removebg-preview.png',5,'./assets/luffy-map.png')
                            }else if(personajeNombre === 'Roronoa Zoro'){
                                personajeEnemigo = new Personaje('Roronoa Zoro','zoro','./assets/zoro-removebg-preview.png',5,'./assets/zoro-map.png')
                            }else if(personajeNombre === 'Vinsmoke Sanji'){
                                personajeEnemigo = new Personaje('Vinsmoke Sanji','sanji','./assets/sanji-removebg-preview.png',5,'./assets/sanji-map.png')
                            }else if(personajeNombre === 'Trafalgar D. Law'){
                                personajeEnemigo = new Personaje('Trafalgar D. Law','law','./assets/law-removebg-preview.png',5,'./assets/law-map.png')
                            }else if(personajeNombre === 'Portgas D. Ace'){
                                personajeEnemigo = new Personaje('Portgas D. Ace','ace','./assets/ace-removebg-preview.png',5,'./assets/ace-map.png')
                            }else{
                                alert('ayuda')
                                return
                            }
                            personajeEnemigo.x = enemigo.x
                            personajeEnemigo.y = enemigo.y

                            return personajeEnemigo
                        })
                    })
            }
        })
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


function revisarColision(enemigo) {
    const arribaPersonaje = personajeJugadorObjeto.y
    const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
    const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
    const izquierdaPersonaje = personajeJugadorObjeto.x
    
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    if(
        abajoPersonaje < arribaEnemigo ||
        arribaPersonaje > abajoEnemigo ||
        derechaPersonaje < izquierdaEnemigo ||
        izquierdaPersonaje > derechaEnemigo 
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarPersonajeEnemigo(enemigo)
    alert('Hay colisión con ' + enemigo.nombreCompleto)
}
window.addEventListener('load',iniciarJuego)