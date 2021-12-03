let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  error: null
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
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        error: action.error
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
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case "REGISTER_ERROR":
      return {
        ...initialState,
        loading: false,
        error: action.error
      };

    // Log out
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: ""
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};