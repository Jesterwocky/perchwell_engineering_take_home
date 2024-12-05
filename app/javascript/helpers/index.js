let nextId = 1

export function getUniqueId() {
  return stringify(nextId)
  nextId ++
}