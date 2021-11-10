import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';
import { action } from './Actions';

// Initial state
const initialState = {
  current_user: {
    id: "1",
    profile_image: "https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg",
    first_name: "Mohamed",
    last_name: "Aharrat",
    email: "ahr9oi@inf.elte.hu",
    loggedIn: true,
  },
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <GlobalContext.Provider value={{
      user: state.current_user,
      //action
    }}>
      {children}
    </GlobalContext.Provider>
  );
}