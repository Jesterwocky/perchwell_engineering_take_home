import React, { useState } from 'react';
import { useEffectOnMount } from '../../helpers/customHooks';
import { fetchBuildings } from '../../helpers/api';

const Buildings = () => {
  const [buildings, updateBuildings] = useState([])

  async function getAllBuildings() {
    const buildings = await fetchBuildings()
    updateBuildings(buildings)
  }

  useEffectOnMount(() => {
    getAllBuildings()
  })

  return (
    <div>
      <h3>Buildings!</h3>

      <div className="buildings-container">
        {buildings.map(building => (
          <div key={building.id} className="building">
            {building.address}
            {building.client_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buildings;
