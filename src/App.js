import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './pages/routes';
import { AuthProvider, RoomProvider, BookProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <RoomProvider> {/* Try later to merge all data providing contexts in one */}
        <BookProvider>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route key={route.name} path={route.path} exact element={route.element} />
            ))}
          </Routes>    
        </Router>  
        </BookProvider>
      </RoomProvider>
    </AuthProvider>  
  );
}

export default App;
