const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const path = require('path');

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

app.get('/notes', function(req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

app.post('/api/notes', function(req, res) {
    console.log(req.body)
});