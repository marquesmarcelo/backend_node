const bcrypt = require('bcryptjs');

const { User } = require ('../../src/app/models');
const truncate = require('../utils/truncate');

describe ('User', () => {
    //apagar os dados de todas as tabelas antes de iniciar os testes
    beforeEach(async () => {
        await truncate();
    })

    it('verificar a encriptação do password', async () => {
        const user = await User.create({
            nome: "Maria",
            email: "maria@test.com",
            password: "123123"
        });
        const compareHash = await bcrypt.compare('123123', user.password_hash);

        expect(compareHash).toBe(true);
    });
});