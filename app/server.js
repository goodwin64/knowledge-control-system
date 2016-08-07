"use strict";

var app = require("./index");
var config = require("./config");

var server_port = config.express.port || process.env.PORT || 3000;
var server_host = config.express.ip || '0.0.0.0';

app.listen(server_port, server_host, function (error) {
    if (error) {
        console.log("Unable to listen for connections", error);
        process.exit(10);
    }
    console.log("Express is listening on http://" + server_host + ":" + server_port);
});
