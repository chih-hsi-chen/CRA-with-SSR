import React from 'react';
import { Provider } from "react-redux";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import renderRoutes from '../helpers/renderRouteCustom';
import serialize from 'serialize-javascript';
import Routes from '../helpers/routes';

export default (req, store, context, indexData) => {
    const app = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context} >
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    return indexData
        .replace(
            '<div id="root"></div>',
            `<div id="root">${app}</div>
             <script>window.__PRELOADED_STATE__  = ${serialize(store.getState())}</script></body>
            `
        );
};