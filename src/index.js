const express = require('express');
const pool = require('./database');

const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = 'select * from products';
        const rows = await connection.query(query);
        res.status(200).json(rows);

    } catch (error) {
        console.log(error);
    }
});

app.post('/products', async (req, res) => {
    console.log(req.body);
    const connection = await pool.getConnection();
    const query = 'INSERT INTO products VALUE (?)';
    const result = await connection.query(query, [req.body.name]);
    res.status(200).json(result);
});

app.listen(3000, () => {
    console.log('server on port 3000');
});