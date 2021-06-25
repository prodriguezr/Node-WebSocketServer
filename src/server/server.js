require('dotenv').config();

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
    }

    // Midddlewares
    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.static('public'));
        this.app.use(cors());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening at http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;