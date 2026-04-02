//create a express server

//package.json ===> type ===> module ===> import express
//package.json ===> type = commmonjs ===> const, require



const express = require('express');
const path = require("path");
const app = express();

//Middleware ===> Middleware runs before route, call before function
//usecase : Authorization, Aunthentication, Validation  , Error

//user req ----> server route
//server route) server res ---> user
//with middleware :
// user req---> middleware(server) --> server route



app.use((req, res, next) => {
    console.log('🔺 Middleware is running');
    next(); // Call the next middleware or route handler
});


//login req --> middleware (check user into database) --> server route(profile)






// get(frontend Route, fn)
app.get("/", function(req, res){
    res.send("🐧😉 Welcome to Express.js 😉🐧")
})

app.get("/login", function(req, res){
    const dirPath = path.resolve();
    const filePath = path.join(dirPath, 'Pages', 'login.html');
res.sendFile(filePath);
})

//error handling :
//last listed route. always write after all routes because it will catch all the errors that are not handled by the previous routes.
app.use(function(req, res){
    res.status(404).send("Page Not Found 🚫")
    res.status(500).send("Something went wrong 😐")

})


app.get("/signup", function(req, res){
res.send("New User Sign Up 👩");
})

app.get("/profile", function(req, res){
res.send("This is your profile page");
})


app.listen(3000, () => {
    console.log('✔ Server is running on port localhost:3000');
});