import React, { useState } from 'react';

const Buildings = () => {
  const [buildings, updateBuildings] = useState([])

  return (
    <div>
      <h3>Buildings!</h3>

      <div className="buildings-container">
        {buildings.map(building => (
          <div className="building">
            {building.address}
            {building.client_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buildings;
