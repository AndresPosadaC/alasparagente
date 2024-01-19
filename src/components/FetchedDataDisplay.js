import React from 'react';

const FetchedDataDisplay = (props) => {
  return (
    <div>
      <h2>Datos Recuperados</h2>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};

export default FetchedDataDisplay;
