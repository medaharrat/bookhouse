const API_URL = 'https://localhost:8000/api';

// Log in
export async function login(dispatch, payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${API_URL}/auth/login`, requestOptions);
    let data = await response.json();
    
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
    dispatch({ type: 'LOGIN_ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

// Register
export async function register(dispatch, payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };  
  // Begin register
  dispatch({ type: 'REQUEST_REGISTER' });
  // Make request
  try {
    let response = await fetch(`${API_URL}/auth/signup`, requestOptions)
    let data = await response.json();

    if(data.user) {
      dispatch({ type: 'REGISTER_SUCCESS', payload: data});
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    } else {
      dispatch({ type: 'REGISTER_ERROR', error: data.errors[0]});
      return;
    }
  }
  catch( error ) {
    dispatch({ type: 'REGISTER_ERROR', error: error });
  }
}

// Log out
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
}