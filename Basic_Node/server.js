//if you want to create a node server use http module of node

//http and https modules

//1. Protocols ==> rules ==> how to send data, how to receive data, how to handle errors, how to manage connections, etc.
//2. http ==> Hyper text transfer protocol
//3. https ==> Hypertext transfer protocol secure


//http and https modules are used to create web servers, make HTTP requests, and handle HTTP responses in node.js. They provide a way to communicate over the web using HTTP protocol. The http module is used for non-secure communication, while the https module is used for secure communication using SS/TLS encryption.

const http = require("http");

//create a route for homepage only
//req ==> send by users
//res ==> send by server

const server = http.createServer((req,res)=>{
    //console.log(req)
    res.end("Hello world\nRitika these side\nLearning node js");
   
})

server.listen(3000,()=>{
    console.log("Server is running on port localhost:3000")
})

