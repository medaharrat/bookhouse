import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import { routes } from './pages/routes';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} exact element={route.element} />
          ))}
        </Routes>    
      </Router>    
    </GlobalProvider>
  );
}

export default App;
