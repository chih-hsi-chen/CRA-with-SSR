import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import path from 'path';
import App from '../App';

const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    return next();
});

app.get("^/$", (req, res, next) => {
    const app = renderToString(<App />);
    
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Some error happened");
        }
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${app}</div>`
            )
        );
    });
});

app.use(express.static("build"));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});