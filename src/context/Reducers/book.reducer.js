export const initialState = {
  books: "",
  loading: false,
  error: null
};

export const BookReducer = (initialState, action) => {
  switch (action.type) {
    /* Ongoing Request */
    case "REQUEST":
        return {
          ...initialState,
          loading: true
    };
    /* Show all */
    case "GET_ALLBOOKS_SUCCESS":
        return {
          ...initialState,
        rooms: action.payload.books,
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