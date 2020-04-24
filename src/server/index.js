import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath, Route } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import express from 'express';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import App from '../App';
import Routes from '../helpers/routes';

const app = express();
const port = process.env.PORT || 3000;

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
}

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
app.use(
    compression({
        level: 6, // set compression level from 1 to 9 (6 by default)
        filter: shouldCompress // set predicate to determine whether to compress
    })
);
app.use(express.static("build"));

app.get("*", (req, res, next) => {
    const matched_routes = matchRoutes(Routes, req.path);
    const routes_with_loadData = matched_routes.filter(({ route }) => {
        return route.loadData;
    });
    let promises = [];

    routes_with_loadData.forEach(({ route }) => {
        promises.push(route.loadData());
    });

    Promise.all(promises).then(dataArr => {
        let data = {};
        routes_with_loadData.forEach(({ route, match }, idx) => {
            data[match.url] = dataArr[idx];
        });

        const context = { data };
        const app = renderToString(
            <StaticRouter location={req.url} context={context} >
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        );

        fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, indexData) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Some error happened");
            }
            if (context.status === 404) {
                res.status(404);
            }
            if (context.url) {
                return res.redirect(301, context.url);
            }

            return res.send(
                indexData
                    .replace(
                        '<div id="root"></div>',
                        `<div id="root">${app}</div>`
                    )
                    .replace(
                        '</body>',
                        `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></body>`
                    )
            );
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});