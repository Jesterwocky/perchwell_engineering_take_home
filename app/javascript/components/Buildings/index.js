import React, { useState } from 'react';

import Building from '../Building';

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
    <>
      <div className="buildings-container">
        {buildings.map(building => (
          <Building key={building.id} {...building}/>
        ))}
      </div>
    </>
  );
};

export default Buildings;
