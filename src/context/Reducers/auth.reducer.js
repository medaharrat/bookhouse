let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";

export const initialState = {
  userDetails: "" || user,
  token: "" || token,
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
        user: action.payload.user,
        token: action.payload.auth_token,
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
        user: action.payload.user,
        token: action.payload.auth_token,
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
        token: ""
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};