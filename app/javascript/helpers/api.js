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
      "brick_count": ""
    }
  ]
}

function createDummyApiResponse(data) {
  return {
    status: 'success',
    ...dummyBuildingsData
  }
}

function dummyGet() {
  return createDummyApiResponse(dummyBuildingsData)
}

export async function fetchBuildings(page = null) {
  // TODO: implement real API call
  try {
    const res = await new Promise(resolve => resolve(dummyGet()))
    const data = getDataFromApiResponse(res)
    return data.buildings
  } catch (error) {
    return new Error('Could not fetch buildings')
  }
}