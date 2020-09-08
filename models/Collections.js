const mongoose = require('mongoose')
const {Schema } = mongoose

const CollecionSchema = new Schema({
  title: {
      type:String,
      required:true
  },
  items:[]
})


module.exports = mongoose.model('ShopCollection', CollecionSchema)