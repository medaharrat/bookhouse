import React, { createContext, useContext, useReducer } from 'react';
import { BookReducer, initialState } from '../Reducers/book.reducer';

// Create context
const BookContext = createContext();
const BookDispatchContext = createContext();

// Hooks
export function useBookState() {
    const context = useContext(BookContext);
    if (context === undefined) {
      throw new Error("useBookState must be used within a BookProvider.");
    }
  
    return context;
}
  
export function useBookDispatch() {
    const context = useContext(BookDispatchContext);
    if (context === undefined) {
      throw new Error("useBookDispatch must be used within a BookProvider.");
    }
  
    return context;
}

// Provider component
export const BookProvider = ({ children }) => {
  const [user, dispatch] = useReducer(BookReducer, initialState);

  return (
    <BookContext.Provider value={user}>
        <BookDispatchContext.Provider value={dispatch}>
          {children}
        </BookDispatchContext.Provider>
    </BookContext.Provider>
  );
}