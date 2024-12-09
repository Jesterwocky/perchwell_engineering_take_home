import { getUniqueId } from '.'


const dummyBuildingsData = {
  buildings: [
    {
      "id": "1",
      "client_name": "rock_walls_only",
      "address": "45 Main St",
      "state": "NY",
      "zip": "10001",
      "rock_wall_size": "15",
      "rock_wall_length": "26"
    },
    {
      "id": "2",
      "client_name": "brick_walls_only",
      "address": "123 Side St",
      "state": "NY",
      "zip": "10001",
      "brick_color": "red",
      "brick_count": "0"
    }
  ]
}

const dummyClientData = {
  clients: [
    {
      name: 'rock_walls_only',
      id: 'client-1',
      custom_fields: [
        {
          id: 'custom-field-1',
          name: 'rock_wall_size',
          type: 'number'
        },
        {
          id: 'custom-field-2',
          name: 'rock_wall_length',
          type: 'number'
        },
      ],
    },
    {
      name: 'brick_walls_only',
      id: 'client-2',
      custom_fields: [
        {
          id: 'custom-field-3',
          name: 'brick_color',
          type: 'enum',
          options: ['red', 'black', 'white', 'beige',]
        },
        {
          id: 'custom-field-4',
          name: 'brick_count',
          type: 'number'
        },
      ],
    }
  ]
}

function createDummyApiResponse(data) {
  return {
    status: 'success',
    ...data
  }
}

function dummyGetBuildings() {
  return createDummyApiResponse(dummyBuildingsData)
}

function dummyGetClientData() {
  return createDummyApiResponse(dummyClientData)
}

function dummyCreateBuilding(building) {
  const newBuilding = {
    ...building,
    id: getUniqueId(),
  }

  return createDummyApiResponse({
    buildings: [
      newBuilding
    ]
  })
}

function dummyUpdateBuilding(id, updates) {
  return createDummyApiResponse({
    buildings: [
      {
        id,
        ...updates
      }
    ]
  })
}

export async function fetchBuildings(page = null) {
  try {
    const res = await fetch('/api/buildings')
    const data = await res.json()
    return data
  } catch (error) {
    return error
  }
}

export async function fetchClientData() {
  try {
    const res = await fetch('api/clients')
    const data = await res.json()
    return data
  } catch (error) {
    return new Error('Could not fetch client data')
  }
}

export async function createBuilding(building) {
  try {
    const res = await fetch('api/buildings', {
      method: 'POST',
      body: JSON.stringify({ building }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    return data[0]
  } catch (error) {
    return new Error('Could not create building')
  }
}

export async function updateBuilding(id, updates) {
  try {
    const res = await fetch(`api/buildings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ building: updates }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    return data[0]
  } catch (error) {
    return new Error('Could not update building')
  }
}