import { useState} from 'react';

const baseUrl = 'http://172.20.10.4:3001/api/';
// const baseUrl = 'http://192.168.0.7:3001/api/';

const useApiPost = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fullUrl = `${baseUrl}${endpoint}`;

  const postData = async (data) => {
    setIsLoading(true);
    setError(null);

    console.log("Data trying to be post with API:", data);

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || 'Algo salió mal');
      }

      setIsLoading(false);
      return true; // You can return a success flag or other data if needed
    } catch (error) {
      setError(error.message || 'Algo salió mal cargando los datos');
      setIsLoading(false);
      return false; // You can return a failure flag or other data if needed
    }
  };

  return { postData, isLoading, error };
};

export default useApiPost;
