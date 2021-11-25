import React, { createContext, useContext, useReducer } from 'react';
import { AuthReducer, initialState } from '../Reducers/auth.reducer';

// Create context
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// Hooks
export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider.");
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider.");
  }

  return context;
}

// Authentification Provider
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
 
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};