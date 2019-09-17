const Users = require('../users-model');

const db = require('../database/dbConfig');

describe('The User Model', () => {

    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('the insert function', () => {
        it('Should insert a user', async () => {
            const userData = { username: 'Test', password: 'Pass'};
            const user = await Users.add(userData);
            const users = await db('users');
            expect(users.length).toBe(1);
            expect(users[0].username).toBe('Test');

        });
        it('Should fail if no user data', async () => {
            const userData = { username: 'Test2', password: 'Pass2' };
            const user = await Users.add(userData);
            const users = await db('users');
            expect(users.length).toBe(1);
            expect(users[0].password).toBe('Pass2');
        })
    });

    describe('the find by id function', () => {
        it('Should return user ID of 1', async () => {
            const newUser = await Users.add({ username: 'Number 1', password: 'pass'});
            const users = await db('users');
            expect(users[0].id).toBe(1);
        })
        it('Should return the user ith ID 1', async () => {
            const newUser = await Users.add({ username: 'Number 1', password: 'pass'});
            const user = await Users.findById(1);
            expect(user.username).toBe('Number 1');
        })
    })
})