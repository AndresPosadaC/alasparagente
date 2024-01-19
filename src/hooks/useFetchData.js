import { useState, useEffect, useCallback } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (fetchError) {
      setError(fetchError);
      setLoading(false);
    }
  }, [url]);
 
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
