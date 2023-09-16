const express = require('express');
const app = express();
const port = 3000;
const budget = {
    myBudget: [{
            title: 'Eat out',
            budget: 35
        },
        {
            title: 'Rent',
            budget: 200
        },
        {
            title: 'Grocery',
            budget: 100
        },
    ]
};

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello world');
});
app.get('/budget', (req, res) => {
    res.json(budget);
});
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});