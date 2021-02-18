const express = require('express');
const posts= require("./posts-model")
const {validateUserId,
  validateUser,
  validatePost}= require("../middleware/middleware");
const { post } = require('../users/users-router');


const router = express.Router();

router.get('/', (req, res,next) => {
  // DO YOUR MAGIC
  const options = {
    sortBy: req.query.sortby,
    limit: req.query.limit
  }
  posts.get(options)
  .then((users)=>{
    res.json(users)
    next()
  }).catch((error)=>{
    next(error)
  })
});

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  post.getByID(req.params.id)
  .then((posts)=>{
    res.json(posts)
    next()
  }).catch((error)=>{
    next(error)
  })
});

// do not forget to export the router
module.exports = router
