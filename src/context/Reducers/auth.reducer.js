let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";

export const initialState = {
  userDetails: "" || user,
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    // Log in
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        loading: false
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    // Register
    case "REQUEST_REGISTER":
      return {
        ...initialState,
        loading: true
      };
    case "REGISTER_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        // add token
        loading: false
      };
    case "REGISTER_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    // Log out
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};