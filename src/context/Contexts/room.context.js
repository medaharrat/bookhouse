import React, { createContext, useContext, useReducer } from 'react';
import { RoomReducer, initialState } from '../Reducers/room.reducer';
// import { getRooms } from '../Actions/room.actions';

// Create context
const RoomStateContext = createContext();
const RoomDispatchContext = createContext();

// Hooks
export function useRoomState() {
  const context = useContext(RoomStateContext);
  if (context === undefined) {
    throw new Error("useRoomState must be used within a RoomProvider.");
  }

  return context;
}

export function useRoomDispatch() {
  const context = useContext(RoomDispatchContext);
  if (context === undefined) {
    throw new Error("useRoomDispatch must be used within a RoomProvider.");
  }

  return context;
}

// Authentification Provider
export const RoomProvider = ({ children }) => {
  const [rooms, dispatch ] = useReducer(RoomReducer, initialState);

  return (
    <RoomStateContext.Provider value={rooms}>
      <RoomDispatchContext.Provider value={dispatch}>
        {children}
      </RoomDispatchContext.Provider>
    </RoomStateContext.Provider>
  );
};