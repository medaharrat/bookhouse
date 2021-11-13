import Room from './Room';
import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Profile from './Profile';
import Splash from './SplashScreen';

const routes = [
    {
        name: "splash",
        path: "/",
        element: <Splash />,
        isPrivate: false,
    },
    {
        name: "home",
        path: "/home",
        element: <Home />,
        isPrivate: true,
    },
    {
        name: "room",
        path: "/r",
        element: <Room title="De la haine à Hollywood by Said Taghmaoui"/>,
        isPrivate: true,
    },
    {
        name: "login",
        path: "/login",
        element: <Login />,
        isPrivate: false,
    },
    {
        name: "register",
        path: "/register",
        element: <Register />,
        isPrivate: false,
    },
    {
        name: "profile",
        path: "/p/:userId",
        element: <Profile />,
        isPrivate: true,
    },
]

export { routes }