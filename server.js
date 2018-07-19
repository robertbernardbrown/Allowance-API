const http = require("http");
const app = require("./app");
const db = require("./api/models");

require('dotenv').config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

db.sequelize.sync().then(function() {
    server.listen(port, function() {
        console.log("App listening on PORT " + port);
        server.emit('serverStarted');
    });
});