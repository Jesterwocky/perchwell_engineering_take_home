export const fieldType = {
  freeform: 'freeform',
  number: 'number',
  enum: 'enum',
}

export const defaultBuildingFields = [
  {
    id: 'default-field-1',
    name: 'address',
    type: fieldType.freeform,
    isDefault: true,
  },
  {
    id: 'default-field-2',
    name: 'state',
    type: fieldType.freeform, // NOTE: should probably be enum, but will leave it freeform for now
    isDefault: true,
  },
  {
    id: 'default-field-3',
    name: 'zip',
    type: fieldType.freeform,
    isDefault: true,
  },
]