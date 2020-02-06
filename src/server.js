const app = require('./AppController');

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST_IP || '0.0.0.0';

app.listen(port, () => {
    console.log(`App executando no servidor na porta ${port}.`)
})
