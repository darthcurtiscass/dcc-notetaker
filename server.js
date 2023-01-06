const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => { //create helper file with this functionality, so that I don't have to write it twice.
        if (err) {
            res.status(500)
            console.log(err);
        } else {
            res.status(200).json(JSON.parse(data));
        }
    }
    );

    console.info(`${req.method} request received to retreive notes`)
    // const { title, text } = req.body;

    // if (title && text) {

    //     const newNote = {
    //         title,
    //         text,
    //     };

      
    // }
});

//Place helper function here.



app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add new note`);

    const { title, text } = req.body;

    const id = uuidv4();

    if (title && text) {
        
        const newNote = {
          title,
          text,
          id
        };    
//Place helper fucntion here
        fs.readFile('./db/db.json', 'utf8', (err, data) => { //create helper file with this functionality, so that I don't have to write it twice.
            if (err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (sendErr) =>
                    sendErr
                    ? console.error(sendErr)
                    : console.info("Notes sent to db.")
                );
            }
});

const response = {
    status: "success",
    body: newNote,
};

console.log(response);
res.status(201).json(response);
} else {
    res.status(500).json("Error. Could not post review");
}
});

app.listen(PORT, () => {
    console.log('server is running')
})

//use middleware to include css--Done
//create get route to load notes
//post route for adding new notes




