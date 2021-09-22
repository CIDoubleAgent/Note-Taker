const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}.`);
});

// The following HTML routes should be created:
// * `GET /notes` should return the `notes.html` file.
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// * `GET *` should return the `index.html` file.
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

// The following API routes should be created:
// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', function(req, res) {
   
    const buffer = fs.readFileSync("./db/db.json")
    //return buffer.toString()
    const response = JSON.parse(buffer.toString())
    res.send( response );
});

app.delete('/api/notes/:id', function(req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        let fileData = JSON.parse(data);
        let { id } = req.params
        let filteredData = fileData.filter((note) => {
            return note.id !== id
        })
        fs.writeFile("./db/db.json", JSON.stringify(filteredData), "utf8", (error) => {
            console.log(error, "Note Deleted")
        })
    })
});


// * `POST /api/notes` should receive a new note to save 
//on the request body, add it to the `db.json` file, and 
//then return the new note to the client. You'll need to 
//find a way to give each note a unique id when it's saved 
//(look into npm packages that could do this for you).
app.post('/api/notes', function(req, res) {
    if (req.body) {
        let fileData;
        const noteData = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        }

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            fileData = JSON.parse(data)
            fileData.push(noteData)
            fs.writeFile("./db/db.json", JSON.stringify(fileData), "utf8", (error) => {
                console.log(error, "Note Saved")
            })
        })
    }
});



