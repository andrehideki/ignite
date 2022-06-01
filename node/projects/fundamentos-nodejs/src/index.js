const express = require('express');
const app = express();
const port = 3333;

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello World Ignite',
        project: 'Fundamentos do Node JS'
    })
});

app.get('/courses', (req, res) => {
    console.log(req.query);
    return res.json(['c1', 'c2', 'c3']);
})

app.post('/courses', (req, res) => {
    console.log(req.body)
    return res.json(['c1', 'c2', 'c3', 'c4'])
})

app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    return res.json(['c1', 'c2', 'c3', 'c5'])
})

app.patch('/courses/:id', (req, res) => res.json(['c1', 'c2', 'c4', 'c5']))

app.delete('/courses/:id', (req, res) => res.json(['c1', 'c2', 'c5']))

app.listen(port, () => {
    console.log(`Running at: ${port}`);
});