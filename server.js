const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// random id number ---------------------------
var counts = Math.floor(Math.random() * 100);

//get Db --------------------------------------
fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);

    //API's routes ---------------------------

    app.get("/api/notes", (req, res) => {
        res.json(notes);
    })

    app.post("/api/notes", (req, res) => {
        req.body.id = parseInt(counts)
        notes.push(req.body);
        res.json(notes);
        update();
        console.log("New note added");
    })

    app.delete("/api/notes/:id", (req, res) => {
        var findId = notes.find(({ id }) => id === JSON.parse(req.params.id));
        notes.splice(notes.indexOf(findId), 1);
        res.json(notes);
        update();
        console.log("Note Deleted");
    })

    //HTML routes -----------------------------

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "public/notes.html"));
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });
    
    //Update Db ---------------------------------

    function update() {
        fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), err => {
            if (err) throw err;
            return true;
        })
    }

})

//Server listen 
app.listen(PORT, () => console.log("App listening on PORT: http://localhost:" + PORT));
