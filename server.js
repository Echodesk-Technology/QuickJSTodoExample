const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app)
let PORT = 8060 || process.env.PORT
const path = require("path");
const favicon = require('serve-favicon');
const config = require("./quick.config");
const chalk = require("chalk");
const ip = require("ip");
// const success = chalk.greenBright
// const chokidar = require("chokidar")
// const WebSocketServer = require("ws").Server;


/**********************
* Dev Environment
********************/
const network = ip.address();
// Watch file







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
    console.log(chalk.yellowBright(`You can now view your ${path.dirname(__filename).split(path.sep).pop()} in the browser`))
    console.log(chalk.whiteBright("Local:",chalk.green(`localhost:${PORT}`)))
    console.log(chalk.whiteBright("Network:",chalk.green(`http://${network}:${PORT}`)))
    console.log(chalk.whiteBright("Compiled successfully"));
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("public", "index.html"))
});

