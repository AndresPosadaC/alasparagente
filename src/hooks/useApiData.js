import { useState, useEffect, useCallback } from 'react';

const useApiData = (url, dataField) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // Extract the relevant data field from the response and set it in the state
        const extractedData = responseData.map((item) => item[dataField]);
        setData(extractedData);
      })
      .catch((fetchError) => {
        setError(fetchError);
      });
  }, [url, dataField]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // The refreshData function that can be called to re-fetch the data
  const refreshData = () => {
    fetchData();
  };

  return { data, error, refreshData };
};

export default useApiData;
