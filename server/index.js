require('dotenv/config');
const express = require('express'),
port = process.env.PORT || 3001,
path = require('path'),
publicPath = path.join(__dirname, '..','build'),
app = express(),
cors = require('cors'),
{ run } = require('./oracle');


app.use(express.static(publicPath));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/db', async (req,res) => {
    let val = await run(req.body.query);
    res.send({val: val});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});