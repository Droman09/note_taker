var express = require("express");
var app = express();
var path = require("path");

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//HTML routes 
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
})




app.listen(PORT, () => console.log("App listening on PORT: http://localhost:" + PORT));
