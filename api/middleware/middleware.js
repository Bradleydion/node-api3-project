const users = require("../users/users-model")
function logger(){
   // DO YOUR MAGIC
  return (req, res, next)=>{
    const time = new Date().toISOString()
    console.log(`[${time}]${req.method}${req.url}`)
    next()
  }}

function validateUserId() {
  // DO YOUR MAGIC
  return(req,res,next)=>{
    users.getById(req.params.id)
    .then((user)=>{
      if(user){
        req.user=user
        next()}
        else{
          res.status(400).json({
            message:"User not found"
          })
    }
    })
  }
}

function validateUser() {
  return(req,res,next)=>{
    if (!req.body){
      return res.status(400).json({message:"missing post data"})
    }else if (!req.body.name){
      return res.status(400).json({message:"missing required name field"})
    }
    next()
  }
  // DO YOUR MAGIC
}

function validatePost() {
  // DO YOUR MAGIC
  return(req,res,next)=>{
    if (!req.body){
      return res.status(400).json({message:"missing post data"})
    }else if (!req.body.text){
      return res.status(400).json({message:"missing required text field"})
    }
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports={
  logger,
  validateUserId,
  validateUser,
  validatePost,
}