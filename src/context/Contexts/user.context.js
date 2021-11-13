import React, { createContext, useContext, useReducer } from 'react';
import { UserReducer, initialState } from '../Reducers/user.reducer';

// Create context
const UserContext = createContext();
const UserDispatchContext = createContext();

// Hooks
export function useUserState() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error("useUserState must be used within a AuthProvider.");
    }
  
    return context;
}
  
export function useUserDispatch() {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
      throw new Error("useUserDispatch must be used within a AuthProvider.");
    }
  
    return context;
}

// Provider component
export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={user}>
        <UserDispatchContext.Provider value={dispatch}>
          {children}
        </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}