const section = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

// section.style.display = 'flex';

let lienzo = mapa.getContext('2d');
// lienzo.fillRect(5, 15, 20, 40);

let imagen = new Image();
imagen.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';

let imagen2 = new Image();
imagen2.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png';

let x = 100;
let y = 40;
let ancho = 70;
let alto = 70;
let velocidadX = 0;
let velocidadY = 0;

intervalo = setInterval(pintar, 50)

let background = new Image();
// background.src = 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/85-prueba-fuego/programar/mokepon/public/assets/mokemap.png'
background.src = './assets/image/mokemap.png'
background.style.width = mapa.width;
background.style.height = mapa.height;

function pintar(){
    x = x + velocidadX;
    y = y + velocidadY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(background, 0, 0, mapa.width, mapa.height)
    lienzo.drawImage(imagen2, 30, 35, ancho, alto)
    lienzo.drawImage(imagen,x,y,ancho,alto)
}

// lienzo.drawImage(
//     imagen2, 70, 90, 100, 100
// )

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
    // x = x + 5;
    // pintar();
}

function detener() {
    velocidadX = 0;
    velocidadY = 0
}

pintar();

window.addEventListener('keydown', pressKey);
window.addEventListener('keyup', detener);

function pressKey(event) {
    // console.log(event.key)
    switch (event.key) {
        case 'w' || 'ArrowUp':
            mover('up');
            break;
        case 'a' || 'ArrowLeft':
            mover('left');
            break;
        case 's' || 'ArrowDown':
            mover('down');
            break;
        case 'd' || 'ArrowRight':
            mover('right');
            break;
        default:
            break;
    }
}

