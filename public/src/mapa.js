const toPlay = document.querySelector('.toPlay');
const section = document.getElementById('ver-mapa');
const selectPokemon = document.querySelector('.container-select');
const config = document.querySelector('.container-config')
const mapa = document.getElementById('mapa');

let lienzo = mapa.getContext('2d');
let player;
let bot = [];
let velocidadX = 0;
let velocidadY = 0;

let background = new Image();
background.src = './assets/image/mokemap.png'
background.style.width = mapa.width;
background.style.height = mapa.height;

class Player {
    constructor (id, nickname, pokemon) {
        this.id = id;
        this.nickname = nickname;
        this.pokemon = pokemon;
        this.image = new Image()
        this.image.src = pokemon.image
        this.pos = [random(-15, 250), random(-20, 100), 70, 70];
    }

    drawPokemon () {
        lienzo.drawImage(
            this.image,
            this.pos[0],
            this.pos[1],
            this.pos[2],
            this.pos[3]
        )
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function playSingle(){
    const nickname = document.getElementById('nickname').value;
    if (nickname !== '') {
        selectPokemon.style.display = 'none'
        toPlay.style.display = 'none';
        section.style.display = 'flex';
        config.style.display = 'none'
        player = new Player(1, nickname, pokemon);
    }
    createEnemies()
    startGame()
}

async function createEnemies() {
    for (let i = 0; i < random(1,5); i++) {
        const id = Math.floor(random(1, 151))
        const res = await fetch(URL+API+id)
        const pokemonBot = await res.json()
        // console.log(pokemonBot)
        bot.push(new Player(2, 'bot', pokemonBot))
    }
}

function startGame() {
    intervalo = setInterval(pintar, 50)
}

function pintar(){
    player.pos[0] = player.pos[0] + velocidadX;
    player.pos[1] = player.pos[1] + velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(background, 0, 0, mapa.width, mapa.height)
    for (let i = 0; i < bot.length; i++) {
        bot[i].drawPokemon()
    }
    player.drawPokemon()
}

function pressKey(event) {
    switch (event.key) {
        case 'w':
            mover('up');
            break;
        case 'a':
            mover('left');
            break;
        case 's':
            mover('down');
            break;
        case 'd':
            mover('right');
            break;
        case 'ArrowUp':
            mover('up');
            break;
        case 'ArrowLeft':
            mover('left');
            break;
        case 'ArrowDown':
            mover('down');
            break;
        case 'ArrowRight':
            mover('right');
            break;
        default:
            break;
    }
}

function mover(where){
    switch (where) {
        case 'left':
            velocidadX = -5
            break;
        case 'right':
            velocidadX = 5
            break
        case 'up':
            velocidadY = -5
            break
        case 'down':
            velocidadY = 5
        default:
            break;
    }
}

function detener() {
    velocidadX = 0;
    velocidadY = 0
}

window.addEventListener('keydown', pressKey);
window.addEventListener('keyup', detener);