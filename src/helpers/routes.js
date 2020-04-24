import App from '../App.js';
import {
    Home,
    Posts,
    Todos,
    Child,
    GrandChild,
    NotFound
} from '../pages/pages.jsx';

import loadData from './loadData.js';

const Routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/posts',
                component: Posts,
                loadData: () => loadData('posts')
            },
            {
                path: '/todos',
                component: Todos,
                loadData: () => loadData('todos')
            },
            {
                path: '/child',
                component: Child,
                loadData: () => loadData('posts'),
                routes: [
                    {
                        path: '/child/:grandchild',
                        component: GrandChild,
                        loadData: () => loadData('todos'),
                    }
                ],
            },
            {
                component: NotFound
            }
        ]
    },
];

export default Routes;