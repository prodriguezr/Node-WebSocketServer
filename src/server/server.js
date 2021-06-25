require('dotenv').config();

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);

        this.middlewares();

        this.sockets();
    }

    // Midddlewares
    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.static('public'));
        this.app.use(cors());
    }

    sockets() {
        this.io.on('connection', socket => {
            console.log('Client connected', socket.id);
            
            socket.on('disconnect', () => {
                console.log('Client disconnected', socket.id);
            });

            socket.on('send-msg', (payload) => {
                console.log(payload);
            });
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server listening at http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;