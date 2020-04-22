import 'regenerator-runtime/runtime';
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import path from 'path';
import App from '../App';

const app = express();
const port = process.env.PORT || 3000;


app.use("^/$", (req, res, next) => {
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