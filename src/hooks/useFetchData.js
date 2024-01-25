import { useState, useEffect, useCallback } from 'react';

const baseUrl = 'http://192.168.10.15:3001/api/';

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fullUrl = `${baseUrl}${endpoint}`;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(fullUrl, {
        
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setData(responseData);
      //console.log('Fetched Data:', responseData);
      setLoading(false);
    } catch (fetchError) {
      setError(fetchError);
      setLoading(false);
    }
  }, [fullUrl]);
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // The refreshData function that can be called to re-fetch the data
  const refreshData = () => {
    setLoading(true); // Set loading state to true
    fetchData(); // Call the fetchData function to re-fetch the data
  };

  return { data, error, loading, refreshData };
};

export default useFetchData;
