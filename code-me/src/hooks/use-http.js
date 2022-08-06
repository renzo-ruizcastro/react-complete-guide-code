import axios from 'axios';
import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      let response = {};
      const url =
        typeof requestConfig === 'string' ? requestConfig : requestConfig.url;
      switch (requestConfig.method) {
        case 'GET':
          response = await axios.get(url);
          break;
        case 'POST':
          response = await axios.post(url, requestConfig.body);
          break;
        default:
          response = await axios.get(url);
          break;
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
