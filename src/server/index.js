import { matchRoutes } from 'react-router-config';
import express from 'express';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import createStore from "../helpers/createStore";
import Routes from '../helpers/routes';
import userRouer from './routes/user';
import renderer from './renderer';

const app = express();
const port = process.env.PORT || 3000;
const store = createStore();

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

app.get('/*.*', express.static("build"));

app.use('/api', userRouer);

app.get("*", (req, res, next) => {
    const matched_routes = matchRoutes(Routes, req.path);
    
    const promises = matched_routes
        .map(({ route }) => {
            return route.loadData ? route.loadData(store) : null;
        });
    Promise.all(promises).then(() => {

        fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, indexData) => {
            if(err) {
                return res.status(500).send("Some error happened");
            }
            const context = {};
            const content = renderer(req, store, context, indexData);

            if (context.status === 404) {
                res.status(404);
            }
            if (context.url) {
                return res.redirect(301, context.url);
            }

            return res.send(content);
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});