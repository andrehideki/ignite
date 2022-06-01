const express = require('express');
const { v4: uuidV4 } = require('uuid');
const { getBalance } = require('./getBalance');
const app = express();
const port = 3333;

app.use(express.json());

var costumers = [
    {
        id: uuidV4(),
        cpf: '22222222222',
        name: 'beltrano',
        statement: []
    }
];


const verifyIfExistsAccountCPF = (req, res, next) => {
    const { cpf } = req.headers;
    const costumer = costumers.find(c => c.cpf == cpf);
    if (!costumer) 
        return res.status(400).json({ error: 'costumer not found' });
    req.costumer = costumer;
    return next();
}

app.post('/account', (req, res) => {
    const { cpf, name } = req.body;
    const costumerAlreadyExists = costumers.some(c => c.cpf == cpf);
    if (costumerAlreadyExists) 
        return res.status(400).send({ 
            error: 'Costumer already exists'
        });
    const costumer = {
        cpf,
        name,
        id: uuidV4(),
        statement: []
    };
    costumers.push(costumer);
    return res.status(201).send();
});

app.use(verifyIfExistsAccountCPF);

app.put('/account', (req, res) => {
    const { costumer } = req;
    const { name } = req.body;
    costumer.name = name;
    return res.status(200).send();
});

app.get('/account', (req, res) => {
    const { costumer } = req;
    return res.status(200).send(costumer);
});

app.delete('/account', (req, res) => {
    const { costumer } = req;
    costumers.splice(costumer, 1);
    return res.status(204).send();
});

app.get('/balance', (req, res) => {
    const { costumer } = req;
    const balance = getBalance(costumer);
    return res.json(balance);
});



app.get('/statement', (req, res) => {
    const costumer = req.costumer;
    return res.json(costumer.statement);
});

app.get('/statement/date', (req, res) => {
    const costumer = req.costumer;
    const { date } = req.query;
    const dateFormat = new Date(date + " 00:00");
    const statement = costumer.statement.filter((statement) => dateFormat.toDateString() == statement.created_at.toDateString());
    return res.json(statement);
});

app.post('/deposit', (req, res) => {
    const { description, amount } = req.body;
    const { costumer } = req;
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    };
    costumer.statement.push(statementOperation);
    return res.status(201).send();
});

app.post('/withdraw', (req, res) => {
    const { amount } = req.body;
    const { costumer } = req;
    const balance = getBalance(costumer);
    if (!amount || amount <= 0) 
        return res.status(400).send({ error: 'Invalid amount' });
    if (balance < amount) {
        return res.status(400).send({ error: 'Insufficient funds' });
    }
    costumer.statement.push({
        description: 'withdraw',
        amount,
        created_at: new Date(),
        type: 'debit'
    });
    return res.status(201).send();
});

app.listen(port, () => console.log(`Running at: ${port}`));