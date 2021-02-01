var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data)
    var noteId = 1

    app.get("/api/notes", (req, res) => {
        res.json(notes);
        // console.log(notes)
    })

    app.post("/api/notes", (req, res) => {
        req.body.id = parseInt(noteId)
        notes.push(req.body);
        res.json(notes)
        update()
        // console.log("success")
    })

    app.delete("/api/notes/:id", (req, res) => {
    })

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "public/notes.html"))
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "public/index.html"))
    });

    function update() {
        fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), err => {
            if (err) throw err;
            return true;
        })
    }
})


//Server listen 
app.listen(PORT, () => console.log("App listening on PORT: http://localhost:" + PORT));
