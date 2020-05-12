const {formatPrice} = require('../../lib/utils')

const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    create(req, res) {
        //pegar categorias
        Category.all() //Select * from table
            .then((results) => {
                const categories = results.rows
                return res.render("products/create.njk", { categories })
            }).catch((err) => {
                throw new Error(err)
            })

    },
    async  post(req, res) {
        const keys = Object.keys(req.body) // Validar se todos os campos estão preenchidos

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos')
            }
        })
        let results = await Product.create(req.body)
        const productId = results.rows[0].id;


        return res.redirect(`products/${productId}`)
    },

    async edit(req, res) {
        let results = await Product.find(req.params.id)
        const product = results.rows[0]
        
        if(!product) return res.send("Product not found")
        
        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        results = await Category.all()
        const categories = results.rows

        return res.render('products/edit.njk', {product, categories})
    }
}