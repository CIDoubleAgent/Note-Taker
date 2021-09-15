const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const path = require('path');

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}.`);
});

// The following HTML routes should be created:
// * `GET /notes` should return the `notes.html` file.
app.get('/notes', function(req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// * `GET *` should return the `index.html` file.
app.get('/', function(req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

// The following API routes should be created:
// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.



// * `POST /api/notes` should receive a new note to save 
//on the request body, add it to the `db.json` file, and 
//then return the new note to the client. You'll need to 
//find a way to give each note a unique id when it's saved 
//(look into npm packages that could do this for you).
app.post('/api/notes', function(req, res) {
    console.log(req.body)
});



