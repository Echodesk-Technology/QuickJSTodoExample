const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app)
let PORT = 8060 || process.env.PORT
const path = require("path");
const favicon = require('serve-favicon');




/**********************
* Middleware
********************/
app.use('/public', express.static(path.resolve(__dirname, "public")));
app.use('/src', express.static(path.resolve(__dirname, "src")));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/**********************
* HTTP server
********************/
server.listen(process.env.PORT || PORT, () => { 
    console.log("Server started");
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("public", "index.html"))
});

