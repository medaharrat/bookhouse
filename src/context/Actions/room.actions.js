const API_URL = 'https://localhost:8000/api/room';

// Get all rooms
export async function getRooms(dispatch) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    dispatch({ type: 'REQUEST' });
    let response = await fetch(`${API_URL}`, requestOptions);
    let data = await response.json();
    
    if (data.rooms) {
      dispatch({ type: 'GET_ALLROOMS_SUCCESS', payload: data });
      return data.rooms
    }
    dispatch({ type: 'ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'ERROR', error: error });
  }
}

// Create a room
export async function createRoom(dispatch, payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: 'REQUEST' });
    let response = await fetch(`${API_URL}/create`, requestOptions);
    let data = await response.json();
    
    if (data.user) {
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
      return data
    }
    dispatch({ type: 'ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'ERROR', error: error });
  }
}

// Delete a room
export async function deleteRoom (dispatch, payload) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload._id),
  };  
  dispatch({ type: 'REQUEST' });
  try {
    let response = await fetch(`${API_URL}/delete/${payload._id}`, requestOptions)
    let data = await response.json();

    if(data.user) {
      dispatch({ type: 'DELETE_SUCCESS', payload: data});
      return data
    } else {
      dispatch({ type: 'ERROR', error: data.error});
      return;
    }
  }
  catch( error ) {
    dispatch({ type: 'REGISTER_ERROR', error: error });
  }
}