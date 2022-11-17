import { useReducer, useCallback } from 'react';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const reducer = (state, action) => {
  if (action.type === 'SEND')
    return { data: null, error: null, isLoading: true };
  if (action.type === 'ERROR')
    return { data: null, error: action.error, isLoading: false };
  if (action.type === 'SUCCESS')
    return { data: action.data, error: null, isLoading: false };
  return state;
};

export const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sendRequest = useCallback(
    async (...params) => {
      // ...params to allow sending only the url for GET requests
      dispatch({ type: 'SEND' });
      try {
        const res = await fetch(...params);
        const data = await res.json();
        // firebase returns an error object if the request fails
        if (!res.ok) {
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
        dispatch({ type: 'SUCCESS', data });
      } catch (error) {
        dispatch({ type: 'ERROR', error: error.message });
      }
    },
    [dispatch]
  );

  return { sendRequest, ...state };
};
