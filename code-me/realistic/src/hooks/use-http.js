import axios from 'axios';
import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await fetch(requestConfig.url, {
      //   method: requestConfig.method ? requestConfig.method : 'GET',
      //   body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      //   headers: requestConfig.headers ? requestConfig.headers : {},
      // });

      // if (!response.ok) {
      //   throw new Error('Request failed!');
      // }

      // const data = await response.json();
      let response = {};
      switch(requestConfig.method) {
        case 'GET': response = await axios.get(requestConfig.url); break;
        case 'POST': response = await axios.post(requestConfig.url, requestConfig.body); break;
        default : response = await axios.get(requestConfig.url); break;
      }
      console.log(response);
      applyData(response.data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
