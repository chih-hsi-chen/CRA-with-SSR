import React, { useState, useEffect } from 'react';
import loadData from '../helpers/loadData.js';
import { renderRoutes } from 'react-router-config';

export const Home = ({ name, ...rest }) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

export const Posts = ({ staticContext = {}, match }) => {
    // const staticContextData = staticContext.data && staticContext.data[match.url];
    // const [data, setData] = useState(staticContextData || []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (window.__ROUTE_DATA__[match.url]) {
    //             setData(window.__ROUTE_DATA__[match.url]);
    //             delete window.__ROUTE_DATA__[match.url];
    //         } else {
    //             loadData('posts').then(data => {
    //                 setData(data);
    //             });
    //         }
    //     }, 0);
    // }, []);

    // return (
    //     <ul>
    //         {data.map(post => <li key={post.id}>{post.title}</li>)}
    //     </ul>
    // );
    return (
        <div>
            <h1>posts</h1>
        </div>
    );
};

export const Todos = ({ staticContext = {}, match }) => {
    const staticContextData = staticContext.data && staticContext.data[match.url];
    const [data, setData] = useState(staticContextData || []);

    useEffect(() => {
        setTimeout(() => {
            if (window.__ROUTE_DATA__[match.url]) {
                setData(window.__ROUTE_DATA__[match.url]);
                delete window.__ROUTE_DATA__[match.url];
            } else {
                loadData('todos').then(data => {
                    setData(data);
                });
            }
        }, 0);
    }, []);

    return (
        <ul>
            {data.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    );
};

export const Child = ({ staticContext = {}, route, match }) => {
    const staticContextData = staticContext.data && staticContext.data[match.url];
    const [data, setData] = useState(staticContextData || []);
    
    useEffect(() => {
        setTimeout(() => {
            if (window.__ROUTE_DATA__[match.url]) {
                setData(window.__ROUTE_DATA__[match.url]);
                delete window.__ROUTE_DATA__[match.url];
            } else {
                loadData('posts').then(data => {
                    setData(data);
                });
            }
        }, 0);
    }, []);

    return (
        <div>
            <ul>
                {data.map(post => <li key={post.id}>{post.title}</li>)}
            </ul>
            {renderRoutes(route.routes)}
        </div>

    );
};
export const GrandChild = ({ staticContext = {}, match }) => {
    const staticContextData = staticContext.data && staticContext.data[match.url];
    const [data, setData] = useState(staticContextData || []);

    useEffect(() => {
        setTimeout(() => {
            if (window.__ROUTE_DATA__[match.url]) {
                setData(window.__ROUTE_DATA__[match.url]);
                delete window.__ROUTE_DATA__[match.url];
            } else {
                loadData('todos').then(data => {
                    setData(data);
                });
            }
        }, 0);
    }, []);

    return (
        <ul>
            {data.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    );
};

export const NotFound = ({ staticContext = {} }) => {
    staticContext.status = 404;
    return (
        <div>
            <h1>Oops, there is no corresponding page.</h1>
        </div>
    );
};