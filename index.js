// require your server and launch it
const server = require("./api/server")

// const port = process.env.PORT || 4000
const port = 8080

server.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})