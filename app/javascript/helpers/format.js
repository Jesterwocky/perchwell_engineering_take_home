export function getDataFromApiResponse(apiResponse) {
  const { status, ...restOfData } = apiResponse
  return restOfData
}

export function stringify(data) {
  return typeof data === 'string'
    ? data
    : '' + data;
}

export function underscoresToSpaces(str) {
  return str.replaceAll('_', ' ');
}

export function titleify(str) {
  const words = str.split('_');

  return words.reduce((titleified, word) => {
    titleified.push(word[0].toUpperCase() + word.slice(1));
    return titleified;
  }, []).join(' ');
}

export function sentenceify(str) {
  const withSpaces = underscoresToSpaces(str);
  return withSpaces[0] + withSpaces.slice(1);
}