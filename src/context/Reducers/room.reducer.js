export const initialState = {
  rooms: "",
  room: "",
  loading: false,
  error: null
};

export const RoomReducer = (initialState, action) => {
  switch (action.type) {
    /* Ongoing Request */
    case "REQUEST":
        return {
          ...initialState,
          loading: true
    };
    /* Show all */
    case "GET_ALLROOMS_SUCCESS":
        return {
          ...initialState,
        rooms: action.payload.rooms,
        loading: false
    };
    /* Show single room */
    case "GET_ROOM_SUCCESS":
        return {
        ...initialState,
        room: action.payload.room,
        loading: false
    };
    /* Create */
    case "CREATE_SUCCESS":
      return {
        ...initialState,
        room: action.payload.room,
        loading: false
      };
    case "ERROR":
      return {
        ...initialState,
        loading: false,
        error: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};