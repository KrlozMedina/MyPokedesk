// const URL = 'https://mypokedesk.herokuapp.com';
// const URL = 'https://pokemon-32ua.onrender.com';
// const URL = 'http://localhost:8080';
const URL = "https://mypokedesk-production.up.railway.app"
const API = '/api/pokemon/';

const pokedesk = document.querySelector(".pokedesk");
const container = document.querySelector(".container-pokemon");
const button = document.querySelector(".button-cover");
const name = document.getElementById('name-pokemon');
const img = document.getElementById('img-pokemon');
const containerImg = document.querySelector('.container-img')
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const type = document.getElementById('type');
const generation = document.getElementById('generation');
const containerStats = document.querySelector('.container-stats')
const configGeneration = document.querySelector('.config-generation')
const configType = document.querySelector('.config-type')

let pokemon;

let contador = 0;
let pokemonSelect = 1;
let indexSelect = -1
let idLista = 0;
let cantidad = 0;
let indexFilter = [];
let minValue = 1;
let maxValue = 905;

function cover(state){
    let currentInterval = setInterval(() => {
        if(state === 'down') {
            if(contador < 400) {
                contador++;
            } else {
                button.setAttribute("onclick", "cover('up')")
                clearInterval(currentInterval);
            }
        } else if(state === 'up'){
            if(contador > 0) {
                contador--;
            } else {
                button.setAttribute("onclick", "cover('down')")
                clearInterval(currentInterval);
            }
        }
        pokedesk.style.gap = `${contador}px`;
        container.style.height = `${contador}px`
        containerStats.style.height = `${contador / 4}px`
    }, 0.1);
    getPokemon(pokemonSelect);
}

function typeColor (type) {
    switch (type) {
        case 'normal':
            color = 'rgba(146, 155, 164, 0.25)'
            break;
        case 'fire':
            color = 'rgba(255, 151, 66, 0.25)'
            break;
        case 'water':
            color = 'rgba(50, 147, 221, 0.25)'
            break;
        case 'grass':
            color = 'rgba(49, 193, 73, 0.25)'
            break;
        case 'electric':
            color = 'rgba(252, 210, 0, 0.25)'
            break;
        case 'ice':
            color = 'rgba(75, 210, 192, 0.25)'
            break;
        case 'fighting':
            color = 'rgba(225, 44, 107, 0.25)'
            break;
        case 'poison':
            color = 'rgba(182, 103, 206, 0.25)'
            break;
        case 'ground':
            color = 'rgba(233, 115, 51, 0.25)'
            break;
        case 'flying':
            color = 'rgba(138, 172, 228, 0.25)'
            break;
        case 'psychic':
            color = 'rgba(255, 102, 120, 0.25)'
            break;
        case 'bug':
            color = 'rgba(131, 197, 0, 0.25)'
            break;
        case 'rock':
            color = 'rgba(200, 183, 134, 0.25)'
            break;
        case 'ghost':
            color = 'rgba(74, 105, 179, 0.25)'
            break;
        case 'dragon':
            color = 'rgba(0, 111, 202, 0.25)'
            break;
        case 'dark':
            color = 'rgba(89, 83, 101, 0.25)'
            break;
        case 'steel':
            color = 'rgba(90, 143, 163, 0.25)'
            break;
        case 'fairy':
            color = 'rgba(251, 138, 236, 0.25)'
            break;
        default:
            color = 'white'
            console.log(type)
            console.log(`Falta agregar case para ${type} con id ${id}`)
            break;
    }
}

function prevPokemon(){
    const maxIndex = indexFilter.length - 1;
    if (maxIndex + 1 !== 0) {
        if (pokemonSelect > indexFilter[0]) {
            indexSelect--;
        } else {
            indexSelect = maxIndex
        }
        pokemonSelect = indexFilter[indexSelect]
    } else {
        if(pokemonSelect > minValue) {
            pokemonSelect--;
        } else {
            pokemonSelect = maxValue;
        }
    }
    getPokemon(pokemonSelect);
}

function nextPokemon(){
    const maxIndex = indexFilter.length - 1;
    if (maxIndex + 1 !== 0 ) {
        if (pokemonSelect < indexFilter[maxIndex] && indexSelect <= maxIndex) {
            indexSelect++
        } else {
            indexSelect = 0;
        }
        pokemonSelect = indexFilter[indexSelect]
    } else {
        if(pokemonSelect < maxValue) {
            pokemonSelect++;
        } else {
            pokemonSelect = minValue;
        }
    }
    getPokemon(pokemonSelect);
}

async function getPokemon(id) {
    const response = await fetch(URL+API+id);
    const data = await response.json();
    const type = data.type;
    let num

    if (id < 10) {
        num = `00${id}`
    } else if (id < 100) {
        num = `0${id}`
    } else {
        num = id
    }

    typeColor(type);
    
    name.textContent = `${id} ${data.name.toUpperCase()}`;
    img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full//${num}.png`
    img.alt = data.name;
    containerImg.style.backgroundColor = color;
    [hp.value, attack.value, defense.value, specialAttack.value, specialDefense.value, speed.value] = data.stats.map(stat => {return stat});

    pokemon = data;
}

async function getType() {
    configGeneration.style.display = 'none'

    const res = await fetch(URL+API+'filter/type')
    const data = await res.json();

    const typeIndex = data.filter(element => element.value === type.value)
    indexFilter = typeIndex.map(index => {return index.id})
    if (indexFilter.length !== 0) {
        pokemonSelect = indexFilter[0]
        getPokemon(pokemonSelect)
        indexSelect = 0
    } else {
        configGeneration.style.display = 'flex'
    }
}

function getGeneration() {
    configType.style.display = 'none';
    console.log(generation.value)
    switch (generation.value) {
        case '1ra':
            minValue = 1;
            lenghtPokemon = 151;
            break;
        case '2da':
            minValue = 152;
            lenghtPokemon = 100;
            break
        case '3ra':
            minValue = 252;
            lenghtPokemon = 135;
            break;
        case '4ta':
            minValue = 387;
            lenghtPokemon = 107;
            break
        case '5ta':
            minValue = 494;
            lenghtPokemon = 156;
            break
        case '6ta':
            minValue = 650;
            lenghtPokemon = 71;
            break;
        case '7ma':
            minValue = 721;
            lenghtPokemon = 88;
            break;
        case '8va':
            minValue = 809;
            lenghtPokemon = 97;
            break;
        default:
            minValue = 1;
            lenghtPokemon = 905;
            configType.style.display = 'flex'
            break
    }
    maxValue = minValue + lenghtPokemon - 1;
    pokemonSelect = minValue
    getType();
    getPokemon(pokemonSelect)
}

cover('down');

// function pantalla() {
//     const list = document.querySelector(".list-pokemon");
//     let width = list.clientWidth;
//     let height = list.clientHeight;
//     cantidad = Math.floor(width / 180) * Math.floor(height / 220);
//     listPokemon(cantidad, idLista)
// }

// function prevList() {
//     if(idLista+1 > cantidad) {
//         idLista = idLista - cantidad;
//     }
//     listPokemon(cantidad, idLista)
// }

// function nextList() {
//     if(idLista+cantidad < 905){
//         idLista = idLista + cantidad;
//     }
//     listPokemon(cantidad, idLista)
// }

// function pokemon(id){
//     getPokemon(id)
//     return pokemonSelect = id;
// }

// async function getListPokemon(id) {
//     const res = await fetch(URL+API+id);
//     const data = await res.json();

//     // console.log(data)

//     const type = data.types.map(type => {
//         return type.type.name;
//     });

//     typeColor(type[0])

//     const section = document.querySelector('.list-pokemon');

//     const article = document.createElement('article');
//     article.classList = 'article-list';

//     article.setAttribute('onclick', `pokemon(${id})`);
//     article.style.backgroundColor = color;
//     section.appendChild(article);

//     const name = document.createElement('h1');
//     name.classList = 'name-list';
//     name.textContent = `${data.name.toUpperCase()}`;
//     name.style.backgroundColor = color;
//     article.appendChild(name);

//     const img = document.createElement('img');
//     img.classList = 'img-list';
//     img.src = data.sprites.front_default;
//     img.alt = data.name;
//     article.appendChild(img);
// }

// async function listPokemon(dimension, id){
//     const section = document.querySelector('.list-pokemon');
//     section.innerHTML = '';

//     if(dimension > 9) {
//         dimension = 9
//     }

//     for (let i = 1; i <= dimension; i++) {
//         await getListPokemon(id + i)
//     }
// }

// pantalla();

// window.onresize = function () {
//     // pantalla()
// };

// let playerId = null 

// async function joinToGame() {
//     const res = await fetch(`${URL}/join`)
//     if (res.ok) { 
//         playerId = await res.text()
//         // console.log(id)
//     }
// }

// function selectPokemon(mascota) {
//     fetch(`${URL}/pokemon/${playerId}`, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             pokemon: mascota
//         })
//     });

// }