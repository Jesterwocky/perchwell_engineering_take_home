// Library
import React, { useState } from 'react';

// Helpers
import { useEffectOnMount } from '../../helpers/customHooks';
import { fetchBuildings, fetchClientData, createBuilding } from '../../helpers/api';

// Components
import Building from '../Building';
import NewBuilding from '../Building/NewBuilding';
import BuildingControl from '../BuildingControl';

// Styles
import './styles.css';

const Buildings = () => {
  const [isSavingNewBuilding, setIsSavingNewBuilding] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [buildings, setBuildings] = useState([])
  const [clients, setClients] = useState([])

  async function getAllBuildings() {
    const buildings = await fetchBuildings()
    setBuildings(buildings)
  }

  async function getClients() {
    // Includes custom fields, needed for create or edit.
    const clients = await fetchClientData()
    setClients(clients)
  }

  function startCreating() {
    setIsCreating(true)
  }

  function stopCreating() {
    setIsCreating(false)
  }

  async function handleCreate(building) {
    setIsSavingNewBuilding(true)

    try {
      const newBuilding = await createBuilding(building)
      setBuildings([ newBuilding, ...buildings ])
      setIsCreating(false)
    } catch (error) {
      // TODO: handle error
    } finally {
      setIsSavingNewBuilding(false)
    }
  }

  function getCustomFields(clientName) {
    const client = (clients ?? []).find(c => c.name === clientName)
    return (client?.custom_fields ?? [])
  }

  useEffectOnMount(() => {
    // May want to paginate in app in the future, but for now UI doesn't include page controls
    // so we fetch them all.
    getAllBuildings()

    // Needed for create or edit. For now, we'll just fetch them all. In future could lazy load.
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
            onSave={() => handleCreate(tempId, building)}
            onCancel={stopCreating}
            isLoading={isSavingNewBuilding}
          />
        }

        {buildings.map(building => (
          <Building
            key={building.id}
            building={building}
            customFields={getCustomFields(building.client_name)}
          />
        ))}
      </div>
    </>
  );
};

export default Buildings;
