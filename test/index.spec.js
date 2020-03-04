const mysql = require('../dist/index');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'test',
};

describe('Basic operations', () => {

    it('should retrive all users', async () => {
        const conn = mysql.createPool(config);
        const result = await conn.query('SELECT * FROM user');
        expect(Array.isArray(result)).toBe(true);
    });

    it('should passing values', async () => {
        const conn = mysql.createPool(config);
        const result = await conn.query('SELECT * FROM user WHERE name = ?', ['James']);
        expect(Array.isArray(result)).toBe(true);
    });

    it('should bulk insert', async () => {
        const conn = mysql.createPool(config);
        const data = [
            [null, 'Joe', 'jonathborg', 'Somewhere Brazil', new Date()],
            [null, 'John', 'jonathrocha', 'Somewhere Brazil', new Date()],
        ];
        const result = await conn.query('INSERT INTO user VALUES ?', [data]);
        expect(result.affectedRows).toBe(2);
    });

    it('should update', async () => {
        const conn = mysql.createPool(config);
        const result = await conn.query('UPDATE user SET name = ?, address = ? WHERE name = ?', ['Jonathan', 'My address', 'Joe']);
        expect(result.affectedRows).toBeGreaterThan(0);
    });
})