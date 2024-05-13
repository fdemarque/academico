import knex from 'knex';
import 'dotenv/config';

const connection = knex({
    client: "postgres",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgresql",
        password: "123",
        database: "soccer-status-DB",
        multipleStatements: true
    },
    pool: {
        min: 2,
        max: 10
    }
});

export default connection;
