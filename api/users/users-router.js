const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")
const { userParams, whereNotExists } = require('../../data/db-config');
const {validateUserId,
  validateUser,
  validatePost}= require("../middleware/middleware")

const router = express.Router();

router.get('/', (req, res,next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const options = {
    sortBy: req.query.sortby,
    limit: req.query.limit
  }
  users.get(options)
  .then((users)=>{
    res.status(200).json(users)
    next()
  }).catch((error)=>{
    next(error)
  })
});

router.get('/:id', validateUserId(),(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/',validateUser(), (req, res,next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  users.insert(req.body)
  .then((user)=>{
    res.status(200).json(user)
  }).catch((error)=>{
    next(error)
  })
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',validateUserId(),validatePost(), (req, res,next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  posts.update(req.params.id, req.body)
  .then((usersPost) =>{
    if (usersPost){
      posts.getById(req.params.id).then((updatedPost)=>{
        res.json(updatedPost)
      })
    }
  }).catch((error)=>{
    next(error)
  })
});

router.delete('/:id', validateUserId(),(req, res,next) => {users.remove(req.params.id)
  .then((count)=>{
    if (count >0){
      res.json(count)
    }
  }).catch((error)=>{
    next(error)
  })
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId(),(req, res,next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
  .then((usersPosts)=>{
    res.json(usersPosts)
  }).catch((error)=>{
    next(error)
  })
});

router.post('/:id/posts',validateUserId(),validatePost(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  let body = req.body 
  body["user_id"]=req.params.id
  console.log(body)
  posts.insert(body)
  .then((newPost)=>{
    console.log(newPost)
    res.json(newPost)
  }).catch((error)=>{
    next(error)
  })
});

// do not forget to export the router
module.exports = router
