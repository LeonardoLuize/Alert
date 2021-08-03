const express = require('express');
const app = express();

const path = require('path');
const PORT = 3000

var allNotes = [];

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());


/* Add Messages */
app.post('/api/messages/add', (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var description = req.body.description

    var message = {id, title, description}

    allNotes.push(message);

    res.sendStatus(200)
    
})

/* Load Messages and Search*/
app.get('/api/messages/all', (req, res) => {
    res.send(allNotes);
})

/* Delete message */
app.delete('/api/message/delete/:id', (req, res) => {
    id = req.params.id;

    allNotes.forEach(message => {
        if(message.id == id){
            var position = allNotes.indexOf(message)

            allNotes.splice(position, 1)

            res.send(allNotes)
        }else{
            res.sendStatus(404);
        }
    })
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})