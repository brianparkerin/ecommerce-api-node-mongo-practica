'use strict'

// Declaracion de los pequetes o librerias externas que vamos a usar
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Declaracion de nuestros archivos,librerias o modelos que escribimos y hemos exportado para usarlos
const  Product = require('./models/product')

// Declaracion de inicio de una aplacion o servidor en espress
const app = express()
const port = process.env.PORT || 3000


// parseo de nuestras URL para que se conviertan y se manejen como objetos Json los datos en neustra API
app.use(bodyParser.urlencoded({ extend: false}))
app.use(bodyParser.json())



// Inicio de las rutas y metodos de nuestra API-Rest CRUD...
// List of All products
app.get('/api/product', (rq, res) => {
    res.send(200, {products: []})
})

// Specific Product
app.get('/api/product/:productId', (req,res) => {

})

// Created or Registred new product
app.post('/api/product', (req, res) => {
    //console.log(req.body)
    //res.status(404).send({ message: 'The product is not exist! :('})

    // Imprimir por pantalla o consola informacion...
    console.log('POST /api/product')
    console.log(req.body)

    // almacenar en la base de datos de mongodb
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category =req.body.category
    product.description = req.body.description
    
    product.save((err, productStored) => {
        if (err) res.status(500).send({message: 'Oops! Something is wrong! the product was no saved succesfully... ${err}' })
        
        res.status(200).send({product: 'The product was been saved Succesfully'})
    })
})


// Editar un dato de un producto en especifico
app.put('/api/product/:productId', (req,res) => {

})


// Eliminar un producto de la lista
app.delete('/api/product/:productId', (req, res) => {

})



// Conexion a la Base de Datos y Funcion que inicia la Aplicacion... a traves del driver de conexion que nos provee Mongoose
const uri = 'mongodb+srv://brian:123@cluster0-q2ohg.mongodb.net/ecommerce-api-node-mongo?retryWrites=true&w=majority';
const db = mongoose.connection;

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  db.once('open', _ => {
      console.log('Database is Connected to', uri);
  })

  .catch(err => console.error(err));

db.on('error', err => {
    console.log(err)

})
    // Comando de que inicia la Aplicacion...
    app.listen(port, () => {
        console.log(`API REST is running on http://localhost:${port}`)
    })

