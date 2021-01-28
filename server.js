var express = require("express");
var app = express();
var path = require("path");

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());





app.listen(PORT, () => console.log("App listening on PORT: http://localhost:" + PORT));
