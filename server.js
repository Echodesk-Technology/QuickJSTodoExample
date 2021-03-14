const express = require("express");
const http = require("http");
let PORT = 8060 || process.env.PORT
const path = require("path");
const  favicon = require('serve-favicon');
const app = express();
const liveReload = require("livereload")
const connectLiveReload = require("connect-livereload")
const chalk = require("chalk");

//Middlewares
app.use('/public', express.static(path.resolve(__dirname, "public")));
app.use('/dist', express.static(path.resolve(__dirname, "dist")));
app.use('/src', express.static(path.resolve(__dirname, "src")));
app.use(favicon(path.join(__dirname,'public','favicon.ico')))
app.use(connectLiveReload())



//Live reload
const reload = liveReload.createServer()
// change live reload port defaults to 35729

// change live reload port defaults to 35729
reload.config.port = PORT

reload.watch(path.join(__dirname,'dist'));
reload.watch(path.join(__dirname,'src'));


reload.server.once("connection", () => {
    setTimeout(() => {
        reload.refresh("/")
    },500)
});


//Server to serve index.html
const server = http.createServer(app) 
server.listen(process.env.PORT || PORT, () => {})
app.get('/*', (req,res) => {
    res.sendFile(path.resolve("public", "index.html"))
});




