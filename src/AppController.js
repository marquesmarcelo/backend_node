require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./app/_helpers/error.handler');

const userRoutes = require('./app/routes/user.routes');
const sessionRoutes = require('./app/routes/session.routes');

const logger = require('morgan');


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
        this.express.use(logger('dev'))

    }
    routes() {
        // rota default
        this.express.get('/api/', (request, response) => {
            return response.json({ message: 'App Backend em Node.js' })
        });

        this.express.use('/api/session/', sessionRoutes);

        this.express.use('/api/users/', userRoutes);
        
    }
    errorHandler() {
        // global error handler
        this.express.use(errorHandler);
    }
}

module.exports = new AppController().express;