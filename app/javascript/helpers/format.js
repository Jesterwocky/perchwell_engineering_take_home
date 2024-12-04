export function getDataFromApiResponse(apiResponse) {
  const { status, ...restOfData } = apiResponse
  return restOfData
}