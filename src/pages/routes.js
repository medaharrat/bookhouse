import Room from './Room';
import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Profile from './Profile';
import Splash from './SplashScreen';
import RequireAuth from '../components/Utils/RequireAuth';

const routes = [
    {
        name: "splash",
        path: "/",
        element: <Splash />,
    },
    {
        name: "home",
        path: "/home",
        element: (
            <RequireAuth>
                <Home />
            </RequireAuth>
        ),
    },
    {
        name: "room",
        path: "/r",
        element: (
            <RequireAuth>
                <Room title="De la haine à Hollywood by Said Taghmaoui"/>
            </RequireAuth>
        ),
    },
    {
        name: "login",
        path: "/login",
        element: <Login />,
    },
    {
        name: "register",
        path: "/register",
        element: <Register />,
    },
    {
        name: "profile",
        path: "/p/:userId",
        element: (
            <RequireAuth>
                <Profile />
            </RequireAuth>
        ),
    },
]

export { routes }