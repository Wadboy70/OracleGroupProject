require('dotenv/config');
const express = require('express'),
port = process.env.PORT || 3000,
app = express(),
cors = require('cors'),
{ run } = require('./oracle');

app.use(cors());

//oracledb things


const mypw = process.env.ORACLE_PW;
run(mypw);

//Routes
app.all("*", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/db', (req,res) => {
    res.send("db");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});