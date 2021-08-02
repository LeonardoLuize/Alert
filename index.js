const express = require('express');
const app = express();

const path = require('path');
const PORT = 3000

var allNotes = [];

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());

app.post('/api/messages/add', (req, res) => {
    var title = req.body.title
    var description = req.body.description

    var message = {title, description}

    allNotes.push(message);

    res.sendStatus(200)
    
})

app.get('/api/messages/all', (req, res) => {
    res.send(allNotes);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})