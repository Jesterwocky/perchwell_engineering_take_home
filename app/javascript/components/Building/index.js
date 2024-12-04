import React from 'react';
import './styles.css';

function Building(props) {
  return (
    <div className="building">
      <h3>{props.address}</h3>
      {props.client_name}
    </div>
  );
}


export default Building;