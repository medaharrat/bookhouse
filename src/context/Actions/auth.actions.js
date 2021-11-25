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
    console.log(response)
    let data = await response.json();
 
    if (data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
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
  try {
    dispatch({ type: 'REQUEST_REGISTER' });
    let response = await fetch(`${API_URL}/auth/signup`, requestOptions);
    console.log(`response => ${JSON.stringify(response)}`)
    let data = await response.json();

    if (data) {
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
    return;
  } catch (error) {
    dispatch({ type: 'REGISTER_ERROR', error: error });
  }
}

// Log out
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}