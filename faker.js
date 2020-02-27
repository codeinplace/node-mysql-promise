const faker = require('faker');
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'test',
}).promise();

const data = [];
for (let i = 0; i < 10; i++) {
    data.push([
        null,
        faker.name.findName(),
        faker.internet.userName(),
        faker.address.streetAddress(),
        new Date(),
    ]);
};

(async () => {
    await conn.query('INSERT INTO test.user VALUES ?', [data]);
    console.log('Done!');
})();
