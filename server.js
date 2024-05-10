const express = require('express');
const pool = require('./db');
const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM profiles');
        res.send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.post('/', async (req, res) => {
    console.log("body: " + req.body);
    const { full_name, username } = req.body;
    try {
        await pool.query('INSERT INTO profiles (full_name, username) VALUES ($1, $2)', [full_name, username]);
        res.send({ message: "Successfully added profile" });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE profiles (id SERIAL PRIMARY KEY, full_name VARCHAR(100), username VARCHAR(100))')
        res.send({message: "Successfully added table"});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.listen(PORT, () => console.log(`This is working on :${PORT}`));