const { Pool } = require('pg')

const client = new Pool({
    user: "petsdb",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "pets_dev"
})

module.exports = client;
 

// // async/await
// try {
//     const res = await client.query(text, values)
//     console.log(res.rows[0])
//     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//   } catch (err) {
//     console.log(err.stack)
//   }