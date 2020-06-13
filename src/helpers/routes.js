import App from '../App';
import Home from '../pages/Home';
import Login from "../pages/Login";
import Protected from "../pages/ProtectedPage";
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
                path: '/login',
                ...Login
            },
            {
                path: '/protected',
                ...Protected
            },
            {
                component: NotFound
            }
        ]
    },
];

export default Routes;