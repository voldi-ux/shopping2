
const express = require('express')
const router = express.Router()
const { PutCollections, getShopCollection } = require('../controllers/shop')

router.put('/addCollection',PutCollections)

router.get('/shopcollection', getShopCollection)
exports.router = router