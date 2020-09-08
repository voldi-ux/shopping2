const express = require('express')
const router = express.Router()
const {putUser,getUser} = require('../controllers/signIn')

router.put('/adduser', putUser)
router.get('/getuser', getUser)
exports.router = router