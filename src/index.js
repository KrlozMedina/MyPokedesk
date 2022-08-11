const server = require('./server');
const cors = require('cors');
const pokemons = require('../data/pokemons.json')

function main() {
    server.listen(server.get('port'))
    console.clear();
    console.log('Server run on', server.get('port'));
}

server.use(cors())

server.get('/api/pokemon/:id', (req, res) => {
    const id = req.params.id || '';
    res.send(pokemons[id-1])
    res.end()
})

server.get('/api/pokemon/filter/:dat', (req, res) => {
    const dat = req.params.dat || ''
    const datos = pokemons.map(pokemon => {
        return {
            id: pokemon.id,
            value: pokemon[`${dat}`]
        };
    })
    res.send(datos)
})

main();

// const players = [];

// class Player {
//     constructor(id) {
//         this.id = id;
//     }

//     asignar(pokemon) {
//         this.pokemon = pokemon
//     }
// }

// class Pokemon {
//     constructor(name) {
//         this.name = name
//     }
// }

// server.get('/join', (req, res) => {
//     const id = `${Math.random()}`

//     const player = new Player(id)
//     players.push(player)

//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.send(players)
// });

// server.post('/pokemon/:playerId', (req, res) => {
//     const playerId = req.params.playerId || ''
//     const name = req.body.pokemon || ''
//     const pokemon = new Pokemon(name)
//     console.clear()

//     const playerIndex = players.findIndex((player) => playerId === player.id)
//     if (playerIndex != -1) {
//         players[playerIndex].asignar(pokemon)
//     }

//     console.log('jugadores', players)

//     res.end();
// })