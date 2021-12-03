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
        path: "/r/:id",
        element: (
            <RequireAuth>
                <Room />
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
        path: "/profile",
        element: (
            <RequireAuth>
                <Profile />
            </RequireAuth>
        ),
    },
]

export { routes }