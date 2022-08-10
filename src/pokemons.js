const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

class Pokemon {
    constructor(id, name, image, type, hp, attack, defense, specialAttack, specialDefense, speed) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.type = type;
        this.stats = [hp, attack, defense, specialAttack, specialDefense, speed]
    }
}

async function getPokemons(id) {
    const res = await fetch(API_URL + id);
    const data = await res.json();
    return data;
}

let pokemons = [];

async function createPokemons() {
    for (i = 1; i < 906; i++) {
        data = await getPokemons(i);
        pokemons.push(
            new Pokemon(
                i,
                data.name,
                data.sprites.front_default,
                data.types[0].type.name,
                data.stats[0].base_stat,
                data.stats[1].base_stat,
                data.stats[2].base_stat,
                data.stats[3].base_stat,
                data.stats[4].base_stat,
                data.stats[5].base_stat
            )
        )

        fs.writeFile('./data/pokemons.json', JSON.stringify(pokemons), function (err) {
            if (err) throw err;
            console.log('Saved!', i);
          });
    }
    console.log('Ha finalizado la creacion del archivo pokemons.json')
}





createPokemons();