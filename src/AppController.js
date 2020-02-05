require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./app/_helpers/error.handler');

const userRoutes = require('./app/routes/user.routes');
const sessionRoutes = require('./app/routes/session.routes');
const fileRoutes = require('./app/routes/file.routes');

const logger = require('morgan');

const helmet = require('helmet')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger')

const multerConfig = require('./config/multer')

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.corsConfig();
        this.routes();
        this.swaggerConfig();
        this.errorHandler();
    }

    middlewares() {
        this.express.use(bodyParser.json());
        this.express.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        this.express.use(logger('dev'))
        //proteger contra ataques conhecidos
        this.express.use(helmet())
        this.express.use('/filesUploaded', express.static(multerConfig.dest))
    }
    routes() {
        // rota default
        this.express.get('/api/', (req, res) => {
            return res.json({ message: 'App Backend em Node.js' })
        });

        this.express.use('/api/session/', sessionRoutes);

        this.express.use('/api/users/', userRoutes);

        this.express.use('/api/files/', fileRoutes);

    }
    swaggerConfig() {
        // use swagger-Ui-express for your app documentation endpoint
        this.express.use('/api/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });

        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
    corsConfig() {
        this.express.use(cors());
    }

    errorHandler() {
        // global error handler
        this.express.use(errorHandler);
    }
}

module.exports = new AppController().express;