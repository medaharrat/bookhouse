const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com'; // API Link
const API_URL = 'https://localhost:8000/api';
// Log in
export async function loginUser(dispatch, payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();
 
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
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
    let data = await response.json();
 
    if (data) {
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
 
    dispatch({ type: 'REGISTER_ERROR', error: data.errors[0] });
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