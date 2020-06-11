import App from '../App.js';
import {
    NotFound
} from '../pages/pages.jsx';
import Home from '../pages/Home.jsx';

const Routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                ...Home
            },
            {
                component: NotFound
            }
        ]
    },
];

export default Routes;