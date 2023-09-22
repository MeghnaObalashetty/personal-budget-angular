const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
const fs = require('fs');
app.use(cors());
const budget1 = {
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
// Reading the JSON file and store its contents in a variable
let budget = null;
fs.readFile('budget.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
    budget = JSON.parse(data);
    console.log('JSON data loaded:', budget);
});
app.get('/budget', (req, res) => {
    if (budget) {
        res.json(budget);
    } else {
        res.status(500).json({ error: 'Budget data not available' });
    }
});

//app.use('/', express.static('public'));

/*app.get('/hello', (req, res) => {
    res.send('Hello world');
});*/
app.get('/budget1', (req, res) => {
    res.json(budget1);
});
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});