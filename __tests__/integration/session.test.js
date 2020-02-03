const request = require('supertest');
const app = require('../../src/AppController');
const truncate = require('../utils/truncate')

const factory = require('../factories')

describe('Autenticação', () => {
    //apagar os dados de todas as tabelas antes de iniciar os testes
    beforeEach(async () => {
        await truncate();
    })

    it('Testar autenticação com login e senha válidos', async () => {
        const user = await factory.create('User', {
            password: "123123"
        });

        const response = await request(app)
            .post("/api/session/login")
            .send({
                email: user.email,
                password: "123123"
            });
        expect(response.status).toBe(200);
    });

    it('Testar autenticação com senha invalida', async () => {
        const user = await factory.create('User', {
            password: "123123"
        });

        const response = await request(app)
            .post("/api/session/login")
            .send({
                email: user.email,
                password: "invalido"
            });
        expect(response.status).toBe(401);
    });

    it('Verificar a existência do token JWT', async () => {
        const user = await factory.create('User', {
            password: "123123"
        });

        const response = await request(app)
            .post("/api/session/login")
            .send({
                email: user.email,
                password: "123123"
            });

        expect(response.body).toHaveProperty('token');
    });

    it('Verificar se usuario autenticado acessa rotas privadas', async () => {
        const user = await factory.create('User', {
            password: "123123"
        });

        const response = await request(app)
            .post("/api/session/login")
            .send({
                email: user.email,
                password: "123123"
            });

        const { token } = response.body;

        const response_teste = await request(app)
            .get("/api/users/dashboard")
            .set('Authorization', `Bearer ${token}`)
            ;
        expect(response_teste.status).toBe(200);
    });

    it('Verificar se usuario sem token acessa rotas privadas', async () => {

        const response = await request(app)
            .get("/api/users/dashboard");

        expect(response.status).toBe(401);
    });

    it('Verificar se usuario com token invalido acessa rotas privadas', async () => {

        const response = await request(app)
            .get("/api/users/dashboard")
            .set('Authorization', `Bearer invalido`)

        expect(response.status).toBe(401);
    });
});

//Exemplote de teste
/*
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

function postRequest(name, description) {
  return request(app).post('/roles').send({ name, description });
}

describe('In the role controller', () => {
  beforeEach((done) => {
    request(app).delete('/roles').end(done);
  });

  it('POST /roles responds with a 201 and the created role on success', (done) => {
    postRequest('admin', 'They administrate')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(/"name":\s*"admin"/)
      .expect(/"description":\s*"They administrate"/, done);
  });

  it('GET /roles responds with a 200 on success', () =>
    postRequest('admin', 'Running the show').expect(201)
      .then(() => postRequest('founder', 'Starting it up').expect(201))
      .then(() => postRequest('case manager', 'Helping').expect(201))
      .then(() => postRequest('volunteer', 'Donating the time').expect(201))
      .then(() => request(app).get('/roles').expect(200))
      .then((res) => {
        assert.equal(res.body.length, 4);
        assert.deepEqual(res.body[0], { name: 'admin', description: 'Running the show' });
        assert.deepEqual(res.body[1], { name: 'case manager', description: 'Helping' });
        assert.deepEqual(res.body[2], { name: 'founder', description: 'Starting it up' });
        assert.deepEqual(res.body[3], { name: 'volunteer', description: 'Donating the time' });
      }) // eslint-disable-line comma-dangle
    );
});
*/