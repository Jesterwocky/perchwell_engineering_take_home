import { stringify } from "./format"

let nextId = 100

export function getUniqueId() {
  nextId ++
  return stringify(nextId)
}