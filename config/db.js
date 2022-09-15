const { Client } = require ('pg');
require('dotenv').config();

//connect to Elephant SQL db
const pool = new Client(process.env.PG_ELEPHANT_URL);

pool
    .connect()
    .then(() => {
        console.log('we have connect db successfully');
    })
    .catch((err => console.log(err)));

    module.exports = pool;

    