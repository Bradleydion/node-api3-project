const express = require('express');
const {logger} = require('./middleware/middleware')

const server = express();
server.use(logger())
// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err,req,res,next)=>{
  res.status(500).json({message:"Danger Will Robinson!!! Something went wrong!! I can feel it!"})
})

module.exports = server;
