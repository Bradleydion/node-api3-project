const express = require('express');
const users = require("./users-model")
const { userParams, whereNotExists } = require('../../data/db-config');
const {validateUserId,
  validateUser,
  validatePost}= require("../middleware/middleware")

const router = express.Router();

router.get('/',validateUserId(), (req, res,next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const options = {
    sortBy: req.query.sortby,
    limit: req.query.limit
  }
  users.get(options)
  .then((users)=>{
    res.status(200).json(users)
  }).catch((error)=>{
    next(error)
  })
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
