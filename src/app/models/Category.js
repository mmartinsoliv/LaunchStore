const db = require('../../config/db')

module.exports = {
    all(){ //Listar toda tabelas categories
        return db.query(
            `SELECT * FROM categories`
        )
    }
}