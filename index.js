// Env variables from config.js
const { port } = require("./src/config/config");

// Express lib
const express = require("express");

// Body parser lib
const bodyParser = require("body-parser");

// CORS lib
const cors = require("cors");

// Morgan lib logger middleware https://www.npmjs.com/package/morgan
// To log app activities a good way to keep track of what is going on
// Useful also to the debug issues when an exception come ups
const morgan = require("morgan");

// Defining the server/app
const server = express();

// Using CORS
server.use(cors());

// We use Morgan to log our server
// "tiny" The minimal output of the log the default light param
server.use(morgan("tiny"));

// Body parse JSON
// Returns middleware that only parses json
server.use(bodyParser.json());

// Express urlencoded
// Returns middleware that only parses urlencoded with the QueryString module
/**
 * You NEED express.json() and express.urlencoded()
 * for POST and PUT requests,
 * because in both these requests you are sending data (in the form of some data object)
 * to the server and you are asking the server to accept or store that data (object),
 * which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
 *
 */
server.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Using the Body parser lib
server.use(bodyParser.json());

// Main Routing
server.use(require("./src/routes/index.routes"));

// Starting the server on env port
server.listen(`${port}`, () => {
    // Showing a message to the console informing on which port is running
    console.log(`Server is running on port ${port}`);
});
