const fs = require('fs');
const request = require('supertest');
const app = require('../src/app');
const animalsData = require('../src/data/animals.json');

describe('Cadastro de animais', () => {
    afterAll(()  => {
        while (animalsData.length > 0) {
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('deve cadastrar um animal com sucesso', async () => {
        const res = await request(app).post('/animals?nome=Spike&especie=Cachorro&idade=25');
        expect(res.status).toBe(201);
    });

    it('A idade do animal deve ser um numero inteiro', async () => {
        const res = await request(app).post('/animals?nome=Mimi&especie=Gato&idade=jovem');
        expect(res.status).toBe(400);
    });

    it('O nome deve ter pelo menos 2 caracteres.', async () => {
        const res = await request(app).post('/animals?nome=J&especie=Hamster&idade=1');
        expect(res.status).toBe(400);
    });

});

describe('Retorno de usuários', () => {
    beforeAll(() => {
        animalsData.push({
            'nome': 'Spike',
            'especie': 'Cachorro',
            'idade': 3,
        });
        animalsData.push({
            'nome': 'Mimi',
            'especie': 'Gato',
            'idade': jovem,
        });
        animalsData.push({
            'nome': 'J',
            'especie': 'Hamster',
            'idade': 1,
        });
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    afterAll(()  => {
        while (animalsData.length > 0) {
            animalsData.pop();
        }
        fs.writeFileSync('src/data/users.json', JSON.stringify(animalsData));
    });

    it('deve retornar uma lista com todos os animais', async () => {
        const res = await request(app).get('/animals');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });
})