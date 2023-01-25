const { Pool } = require('pg')

const client = new Pool({
    user: "petsdb",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "pets_dev"
})

module.exports = client;
 