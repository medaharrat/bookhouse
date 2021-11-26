export const initialState = {
    id: "1",
    profile_image: "https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg",
    first_name: "Mohamed",
    last_name: "Aharrat",
    email: "ahr9oi@inf.elte.hu",
    loggedIn: true,
    loading: false,
    error: null,
};

export const UserReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUESACTIONT_LOGIN":
      return {
        ...initialState
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};