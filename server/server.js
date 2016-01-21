var express = require('express');
var app = express();

app.use(express.static('../webui'));

app.listen(2000);
console.log("Server erreichbar unter http://localhost:2000");
