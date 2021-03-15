const express = require("express");
const http = require("http");
let PORT = 8060 || process.env.PORT
const path = require("path");
const favicon = require('serve-favicon');
const app = express();
const config = require("./quick.config");

//Middlewares
app.use('/dist', express.static(path.resolve(__dirname, "dist")));
app.use('/src', express.static(path.resolve(__dirname, "src")));
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));


//Live reload
const liveReload = require('livereload')
const reload = liveReload.createServer();
const connectLiveReload = require('connect-livereload');
app.use(connectLiveReload());
reload.watch(path.resolve(__dirname, "src"))
reload.server.once('connection', () => {
    setTimeout(() => {
        reload.refresh("/")
    }, 500);
})


//Server to serve index.html
const server = http.createServer(app)
server.listen(process.env.PORT || PORT, () => { })

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"))
});

