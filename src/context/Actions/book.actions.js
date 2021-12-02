const API_URL = 'https://localhost:8000/api/book';

// Get all books
export async function getBooks(dispatch) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    dispatch({ type: 'REQUEST' });
    let response = await fetch(`${API_URL}`, requestOptions);
    let data = await response.json();
    
    if (data.books) {
      dispatch({ type: 'GET_ALLBOOKS_SUCCESS', payload: data });
      return data.books
    }
    dispatch({ type: 'ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'ERROR', error: error });
  }
}