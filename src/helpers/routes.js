import App from '../App';
import Main from '../pages/Main';
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
                ...Main
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