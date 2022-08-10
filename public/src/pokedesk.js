const url = 'https://mypokedesk.herokuapp.com/:45434/api/pokemon/';

let contador = 0;
let pokemonSelect = 1;
let idLista = 0;
let cantidad = 0;
// let id = 376 pokemon sin imagen;

function cover(state){
    const pokedesk = document.querySelector(".pokedesk");
    const container = document.querySelector(".container-pokemon");
    const button = document.querySelector(".button-cover");
    currentInterval = setInterval(() => {
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
    }, 0.1);
    getPokemon(pokemonSelect);
}

// function pantalla() {
//     const list = document.querySelector(".list-pokemon");
//     let width = list.clientWidth;
//     let height = list.clientHeight;
//     cantidad = Math.floor(width / 180) * Math.floor(height / 220);
//     listPokemon(cantidad, idLista)
// }

function typeColor (type) {
    switch (type) {
        case 'grass':
            color = 'rgba(0, 128, 0, 0.250)'
            break;
        case 'fire':
            color = 'rgba(128, 0, 0, 0.250)'
            break;
        case 'water':
            color = 'rgba(0, 0, 128, 0.250)'
            break;
        case 'bug':
            color = 'rgba(0, 128, 0, 0.250)'
            break;
        case 'normal':
            color = 'rgba(64, 64, 64, 0.250)'
            break;
        case 'poison':
            color = 'rgba(128, 0, 128, 0.250)'
            break;
        case 'electric':
            color = 'rgba(255, 255, 0, 0.250)'
            break;
        case 'ground':
            color = 'rgba(165, 42, 42, 0.250)'
            break;
        case 'fairy':
            color = 'rgba(255, 192, 203, 0.250)'
            break;
        case 'fighting':
            color = 'rgba(222, 184, 135, 0.250)'
            break;
        case 'psychic':
            color = 'rgba(218, 165, 32, 0.250)'
            break;
        case 'rock':
            color = 'rgba(128, 128, 128, 0.250)'
            break;
        case 'ghost':
            color = 'rgba(105, 105, 105, 0.250)'
            break;
        case 'ice':
            color = 'rgba(100, 148, 237, 0.250)'
            break;
        case 'dragon':
            color = 'rgba(184, 135, 11, 0.250)'
            break;
        case 'dark':
            color = 'rgba(0, 0, 0, 0.250)'
            break;
        case 'steel':
            color = 'rgba(192, 192, 192, 0.250)'
            break;
        case 'flying':
            color = 'rgba(100, 148, 237, 0.250)'
            break;
        default:
            color = 'white'
            console.log(`Falta agregar case para ${type} con id ${id}`)
            break;
    }
}

function prevPokemon(){
    if(pokemonSelect > 1) {
        pokemonSelect--;
    } else {
        // if(pokemons.length == 905) {
            pokemonSelect = 905;
        // }
    }
    getPokemon(pokemonSelect);
}

function nextPokemon(){
    if(pokemonSelect < 905) {
        pokemonSelect++;
    } else {
        pokemonSelect = 1;
    }
    getPokemon(pokemonSelect);
}

function prevList() {
    if(idLista+1 > cantidad) {
        idLista = idLista - cantidad;
    }
    listPokemon(cantidad, idLista)
}

function nextList() {
    if(idLista+cantidad < 905){
        idLista = idLista + cantidad;
    }
    listPokemon(cantidad, idLista)
}

function pokemon(id){
    getPokemon(id)
    return pokemonSelect = id;
}

async function getPokemon(id) {
    const response = await fetch(url+id);
    const data = await response.json();
    // console.log(data);

    // id = id - 1;
    
    // console.log(pokemons[id])

    const name = document.getElementById('name-pokemon');
    name.textContent = `${id}.${data.name.toUpperCase()}`;
    
    const img = document.getElementById('img-pokemon');
    img.src = data.image;
    img.alt = data.name;
    
    // const type = data.types.map(type => {
    //     return type.type.name;
    // });

    // console.log(data.types)
    const type = data.type;
    // console.log('type', type);

    typeColor(type);

    img.style.backgroundColor = color;
    
    const hp = document.getElementById('hp');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const specialAttack = document.getElementById('special-attack');
    const specialDefense = document.getElementById('special-defense');
    const speed = document.getElementById('speed');
    // console.log('data', data.stats)
    [hp.value, attack.value, defense.value, specialAttack.value, specialDefense.value, speed.value] = data.stats.map(stat => {return stat});

    selectPokemon(data.name)
}

async function getListPokemon(id) {
    const res = await fetch(url+id);
    const data = await res.json();

    // console.log(data)

    const type = data.types.map(type => {
        return type.type.name;
    });

    typeColor(type[0])

    const section = document.querySelector('.list-pokemon');

    const article = document.createElement('article');
    article.classList = 'article-list';

    article.setAttribute('onclick', `pokemon(${id})`);
    article.style.backgroundColor = color;
    section.appendChild(article);

    const name = document.createElement('h1');
    name.classList = 'name-list';
    name.textContent = `${data.name.toUpperCase()}`;
    name.style.backgroundColor = color;
    article.appendChild(name);

    const img = document.createElement('img');
    img.classList = 'img-list';
    img.src = data.sprites.front_default;
    img.alt = data.name;
    article.appendChild(img);
}

async function listPokemon(dimension, id){
    const section = document.querySelector('.list-pokemon');
    section.innerHTML = '';

    if(dimension > 9) {
        dimension = 9
    }

    for (let i = 1; i <= dimension; i++) {
        await getListPokemon(id + i)
    }
}

// pantalla();
cover('down');

window.onresize = function () {
    // pantalla()
};




let playerId = null 

async function joinToGame() {
    const res = await fetch('http://localhost:8080/join')
    if (res.ok) { 
        playerId = await res.text()
        // console.log(id)
    }
}

function selectPokemon(mascota) {
    fetch(`http://localhost:8080/pokemon/${playerId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemon: mascota
        })
    });

}