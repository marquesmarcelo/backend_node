require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./app/_helpers/error-handler');

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    middlewares() {
        this.express.use(bodyParser.json());
        this.express.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        this.express.use(cors());
        
    }
    routes() {
        // api routes
        this.express.use('/users', require('./app/controllers/users.controller'));
        //this.express.use(routes);
    }
    errorHandler() {
       // global error handler
       this.express.use(errorHandler);
    }
}

module.exports = new AppController().express;