// Library
import React, { useState } from 'react';

// Helpers
import { useEffectOnMount } from '../../helpers/customHooks';
import { fetchBuildings, fetchClientData, createBuilding, updateBuilding } from '../../helpers/api';

// Components
import Building from '../Building';
import NewBuilding from '../Building/NewBuilding';
import BuildingControl from '../BuildingControl';

// Styles
import './styles.css';

const Buildings = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [buildings, setBuildings] = useState([])
  const [clients, setClients] = useState([])

  async function getAllBuildings() {
    const fetched = await fetchBuildings()
    fetched.sort((b1, b2) => new Date(b2.created_at) - new Date(b1.created_at))
    setBuildings(fetched)
  }

  async function getClients() {
    // Includes custom fields, needed for create or edit.
    const fetched = await fetchClientData()
    setClients(fetched)
  }

  function startCreating() {
    setIsCreating(true)
  }

  function stopCreating() {
    setIsCreating(false)
  }

  async function handleSaveNewBuilding(building) {
    try {
      const newBuilding = await createBuilding(building)
      setBuildings([ newBuilding, ...buildings ])
      stopCreating()
    } catch (error) {
      // TODO: handle error
    }
  }

  async function handleSaveChanges(id, updates) {
    try {
      const building = await updateBuilding(id, updates)
      const buildingIndex = buildings.findIndex(b => b.id === id)

      const buildingsCopy = [...buildings]
      buildingsCopy[buildingIndex] = {
        ...buildingsCopy[buildingIndex],
        ...building
      }
      setBuildings(buildingsCopy)
    } catch (error) {
      // TODO: handle error
    }
  }

  useEffectOnMount(() => {
    getAllBuildings()

    // Needed to create new buildings. Can probably lazy load, but for now we'll just do it on mount.
    getClients()
  })

  return (
    <>
      <BuildingControl
        onClick={startCreating}
        disabled={isCreating}
      >
        Add Building
      </BuildingControl>

      <div className="buildings-container">
        {isCreating &&
          <NewBuilding
            clients={clients}
            onSave={handleSaveNewBuilding}
            onCancel={stopCreating}
          />
        }

        {buildings.map(building => (
          <Building
            key={building.id}
            building={building}
            onSave={updates => handleSaveChanges(building.id, updates)}
          />
        ))}
      </div>
    </>
  );
};

export default Buildings;
