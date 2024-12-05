import { getUniqueId } from '.'
import { getDataFromApiResponse } from './format'

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
  const { client_id, custom_fields = {}, ...fields } = building

  const client = dummyClientData.clients.find(c => c.id === client_id)

  return createDummyApiResponse({
    buildings: [
      {
        ...fields,
        ...Object.keys(custom_fields).reduce((fieldNamesToValues, fieldId) => {
          const field = client.custom_fields.find(f => f.id === fieldId)
          const val = custom_fields[fieldId]

          fieldNamesToValues[field.name] = val
          return fieldNamesToValues
        }, {}),
        client_name: client.name,
        id: getUniqueId(),
      }
    ]
  })
}

function dummyUpdateBuilding(id, updates) {
  return createDummyApiResponse({
    buildings: []
  })
}

export async function fetchBuildings(page = null) {
  // TODO: implement real API call
  try {
    const res = await new Promise(resolve => resolve(dummyGetBuildings()))
    const data = getDataFromApiResponse(res)
    return data.buildings
  } catch (error) {
    return new Error('Could not fetch buildings')
  }
}

export async function fetchClientData() {
  try {
    const res = await new Promise(resolve => resolve(dummyGetClientData()))
    const data = getDataFromApiResponse(res)
    return data.clients
  } catch (error) {
    return new Error('Could not fetch client data')
  }
}

export async function createBuilding(building) {
  try {
    const res = await new Promise(resolve => resolve(dummyCreateBuilding(building)))
    const data = getDataFromApiResponse(res)
    return data.buildings[0]
  } catch (error) {
    return new Error('Could not create building')
  }
}

export async function updateBuilding(id, updates) {
  try {
    const res = await new Promise(resolve => resolve(dummyUpdateBuilding(id, updates)))
    const data = getDataFromApiResponse(res)
    return data.buildings[0]
  } catch (error) {

  }
}