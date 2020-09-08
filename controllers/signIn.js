 const User =require('../models/user')
const { json } = require('body-parser')
 
 exports.putUser = async (req,res, next) => {
    const {displayName, email, phtotUrl} = req.body
    try {
      const user =  await User.findOne({displayName:displayName, email:email})
      if(!user) {
           const newUser = new User({
            displayName, 
             email,
             phtotUrl: phtotUrl || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3tLJmwJG7IHzPeCJkA0sbE&ust=1599546053549000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIj5osez1usCFQAAAAAdAAAAABAD',
           })
          const newUserCreated = await newUser.save()
           return  res.status(201).json({
             user: newUserCreated,
            messsage:'account was created  successfuly'
        })
      } else {
        return res.json({
          user:user,
          messsage:'sigin successful'
        })
      }
    } catch (err) {
          console.log(err.message)
    }

  
}

exports.getUser = async (req,res,next)=> {
  console.log(req.query)
  const {displayName,email} = req.query
  try {
    const user = await User.findOne({displayName,email})
    return res.json({
      user:user,
      messsage:'signin in successful'
    })
  } catch (error) {
    console.log(error.message)
  }
}