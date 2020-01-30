const request = require('supertest');
const app = require('../../src/AppController');
const truncate = require('../utils/truncate')

const factory = require ('../factories')

describe ('Autenticação', () => {
    //apagar os dados de todas as tabelas antes de iniciar os testes
    beforeEach(async () => {
        await truncate();
    })

    it('Testar autenticação com login e senha válidos', async () => {
        const user = await factory.create('User', {           
            password: "123123"
        });

        const response = await request(app)
        .post("/sessions")
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
        .post("/sessions")
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
            .post("/sessions")
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
            .get("/dashboard")
            .set('Authorization', `Bearer ${user.generateToken()}`)
            ;
        expect(response.status).toBe(200);
    });

    it('Verificar se usuario sem token acessa rotas privadas', async () => {      

        const response = await request(app)
            .get("/dashboard");

        expect(response.status).toBe(401);
    });

    it('Verificar se usuario com token invalido acessa rotas privadas', async () => {
       
        const response = await request(app)
            .get("/dashboard")
            .set('Authorization', `Bearer invalido`)
            
        expect(response.status).toBe(401);
    });
});