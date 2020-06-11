import App from '../App';
import Home from '../pages/Home';
import NotFound from "../pages/NotFound";

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