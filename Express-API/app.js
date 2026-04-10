const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set(db());

// cors origin -> allow only that website that mention into origin group, ex. backend only rex when localhost 3002 send request, other than give cors error
// localhost: 3002 -> req -> accept -> give response
// localhost: 3004 -> req -> cors error -> don't give response
// in origin you mention frontend urls (development, production both)
app.use(cors({ origin: "http://localhost:3002", credentials: true }));

PORT = process.env.PORT;

// temp route --> in backend we don't create home route. after testing / development remove home route
app.get("/", (req, res) => {
    res.status(401).json({ message: "Access Denied!!" });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
