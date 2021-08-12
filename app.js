const express = require("express");
const app = express();
let numOfRequests = 0;

// Change these to your liking
const port = 6969;
const objectToReturnOnApiEndpoint = {"message": "Hello World!"};
const errorMessage = {"message": "Resource not found!"}


// API is located at localhost:port/api !


// Creating the /api endpoint
app.get("/api", (req, res) => {
    numOfRequests += 1;
    console.log(`Request recieved! Number of requests recieved: ${numOfRequests}`)

    res.json(objectToReturnOnApiEndpoint);
});

// For pages that are not found
app.all("*", (req, res) => {
    res.json(errorMessage);
    res.status(404)
});

app.listen(port, () => {
    console.log(`Server listening to requests on port ${port}`);
});
