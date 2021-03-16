const express = require("express");
const http = require("http");
let PORT = 8060 || process.env.PORT
const path = require("path");
const favicon = require('serve-favicon');
const app = express();
const config = require("./quick.config");

//Middlewares
app.use('/public', express.static(path.resolve(__dirname, "public")));
app.use('/src', express.static(path.resolve(__dirname, "src")));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));




//Server to serve index.html
const server = http.createServer(app)
server.listen(process.env.PORT || PORT, () => { })

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("public", "index.html"))
});

