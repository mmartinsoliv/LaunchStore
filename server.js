const express = require('express')
const server = express()
const routes = require('./routes')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method')) // PRECISA FICAR ACIMA DO ROUTES
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views',{
     express: server,
     autoescape: false,
     noCache: true
})

const port = 5050
server.listen(port, ()=> console.log("server is running"))