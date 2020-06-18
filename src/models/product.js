'use strict'

const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema


const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category:  { type: String, enum: ['computers', 'phones', 'accesories'] },
    Description: String
})


module.exports = mongoose.model('Product', ProductSchema)