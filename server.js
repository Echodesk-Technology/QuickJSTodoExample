const express = require("express");
const http = require("http");
let PORT = 8060
const path = require("path");
const  favicon = require('serve-favicon');
const app = express();
const liveReload = require("livereload")
const connectLiveReload = require("connect-livereload")
const chalk = require("chalk");
const ip = require ("ip");

//Middlewares
app.use('/public', express.static(path.resolve(__dirname, "public")));
app.use('/dist', express.static(path.resolve(__dirname, "dist")));
app.use('/src', express.static(path.resolve(__dirname, "src")));
app.use(favicon(path.join(__dirname,'public','favicon.ico')))
app.use(connectLiveReload())


//Assign new port
function getNewPort(port) {
    return port+1
}

//Live reload
const reload = liveReload.createServer()

reload.config.port = PORT


reload.watch(path.join(__dirname,'dist'));
reload.watch(path.join(__dirname,'src'));


reload.server.once("connection", () => {
    setTimeout(() => {
        reload.refresh("/")
    },500)
});

// change live reload port defaults to 35729
console.log(reload.config.port);
//Server to serve index.html
const server = http.createServer(app) 


server.listen(process.env.PORT || PORT, () => {
    console.log(chalk.blueBright("Quickjs server started"))
    console.log(chalk.yellowBright(`You can now view your ${path.dirname(__filename).split(path.sep).pop()} in the browser`))
    console.log(chalk.whiteBright("Local:",chalk.green(`localhost:${PORT}`)))
    console.log(chalk.whiteBright("Network:",chalk.green(`http://${network}:${PORT}`)))
    console.log(chalk.whiteBright("Compiled successfully"));
}).on("error", () => {
    PORT === getNewPort(PORT)
});

app.get('/*', (req,res) => {
    res.sendFile(path.resolve("dist", "index.html"))
});

// get ip address
const network = ip.address()


