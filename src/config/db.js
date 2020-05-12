const { Pool} = require('pg')

module.exports = new Pool({
    user:  'matheus',
    password: 'admin',
    host: "localhost",
    port: 5432,
    database: "lauchstoredb"
})