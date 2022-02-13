const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');
const port = process.env.PORT || 8080;

    const connection = mysql.createConnection(
        {
            host: 'uzb4o9e2oe257glt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'hlpsic6ztca4dwle',
            password: 'mumpz8h8959hjbd6',
            database: 'k6nhcsbl684kdmq6',
            port: 8080,
            insecureAuth: true
        });

    connection.connect();

    const app = express()
        .use(cors())
        .use(bodyParser.json())
        .use(events(connection));

    app.listen(port, () => {
        console.log(`Express server listening on port ${port}`)
    });
