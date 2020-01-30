require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');


class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(bodyParser.json());
        this.express.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
    }
    routes() {
        this.express.use(routes);
    }
}

module.exports = new AppController().express;