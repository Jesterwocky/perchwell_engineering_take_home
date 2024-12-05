import { getUniqueId } from '.'
import { getDataFromApiResponse } from './format'

const dummyBuildingsData = {
  buildings: [
    {
      "id": "1",
      "client_name": "rock_walls_only",
      "address": "45 Main St",
      "rock_wall_size": "15",
      "rock_wall_length": "26"
    },
    {
      "id": "2",
      "client_name": "brick_walls_only",
      "address": "123 Side St",
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
          id: 'field-1',
          name: 'rock_wall_size',
          type: 'number'
        },
        {
          id: 'field-2',
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
          id: 'field-3',
          name: 'brick_color',
          type: 'enum',
          options: ['red', 'black', 'white', 'beige',]
        },
        {
          id: 'field-4',
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
    ...dummyBuildingsData
  }
}

function dummyGetBuildings() {
  return createDummyApiResponse(dummyBuildingsData)
}

function dummyGetClientData() {
  return createDummyApiResponse(dummyClientData)
}

function dummyCreateBuilding(building) {
  return createDummyApiResponse({
    buildings: [
      {
        ...building,
        id: getUniqueId()
      }
    ]
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