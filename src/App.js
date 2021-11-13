import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './pages/routes';
import { AuthProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} exact element={route.element} />
          ))}
        </Routes>    
      </Router>  
    </AuthProvider>  
  );
}

export default App;
