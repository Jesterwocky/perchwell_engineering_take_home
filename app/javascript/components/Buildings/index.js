import React, { useState } from 'react';
import { useEffectOnMount } from '../../helpers/customHooks';

const Buildings = () => {
  const [buildings, updateBuildings] = useState([])

  useEffectOnMount(() => {
    console.log('mounting')
  })

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
