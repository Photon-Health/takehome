const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json())
const port = 3000;

const database = {
    patients: {},
    prescriptions: {},
};
app.get('/', (req, res) => {
    res.json({
        message: "hello world!"
    });
});

app.get('/patients', (req, res) => {
    res.json(Object.values(database.patients));
});

app.get('/patients/:id', (req, res) => {
    const value = database.patients[req.params.id];
    if (value) {
        res.json(value);
    }
    res.sendStatus(404)
});

app.post('/patients', (req, res) => {
    const {
        firstName,
        lastName,
    } = req.body || {};
    if (!firstName || !lastName) {
        res.status(400).send("Error: Missing required fields");
    }
    const id = uuidv4();
    database.patients[id] = {
        id,
        firstName,
        lastName,
    }
    res.json(database.patients[id])
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});