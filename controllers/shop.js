const ShopCollection = require('../models/Collections')


exports.PutCollections = async (req,res,next)  => {
    const {title,items} = req.body
   const collection = new ShopCollection({
       title:title,
       items:items
   })
  await collection.save()
  return res.json({
      message:'the collecion was added successfuly'
  })
}

exports.getShopCollection = async (req,res ,next) => {
   const collection  = await  ShopCollection.find()
  return  res.json(collection)
}