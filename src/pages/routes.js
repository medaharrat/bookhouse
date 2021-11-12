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
    },
    {
        name: "home",
        path: "/h",
        element: <Home />,
    },
    {
        name: "room",
        path: "/r",
        element: <Room title="De la haine à Hollywood by Said Taghmaoui"/>,
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
        element: <Profile />,
    },
]

export { routes }