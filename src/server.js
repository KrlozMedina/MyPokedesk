const express = require('express');
const path = require('path');
const morgan = require('morgan');

const server = express();

server.use(express.json())

// Settings
server.set('port', process.env.PORT || 8080);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs')

// Midlewares
server.set(morgan('dev'));
server.use(express.urlencoded({extended: false}));

// Routes
server.use(require('./routes/routes'))

// Static
server.use(express.static(path.join(__dirname, '../public')))

// 404
// server.use((req, res, next) => {
//     res.status(404).send('404 Not found')
// })

module.exports = server;