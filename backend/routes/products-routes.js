const express= require('express');

const router= express.Router()

const productsControllers= require('../../backend/controllers/products-controllers')

router.get('/products', productsControllers.getAllProducts)

router.get('/products/:id',productsControllers.getOneProducts)
router.post('/add-product',productsControllers.addProduct)
module.exports= router