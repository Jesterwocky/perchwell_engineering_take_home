// Library
import React, { useState } from 'react';

// Helpers
import { titleify } from '../../helpers/format';
import { fieldType, defaultBuildingFields } from '../../constants';

// Components
import Field from './Field'
import BuildingControl from '../BuildingControl';


// Styles
import './styles.css';

function NewBuilding({ onSave, onCancel, clients, isLoading }) {
  const [client, setClient] = useState(null)
  const [edits, setEdits] = useState({})

  const fields = [
    ...defaultBuildingFields,
    ...(client?.custom_fields ?? [])
  ];

  function handleClientChange(e) {
    const id = e.target.value;
    const client = clients.find(c => c.id === id);
    setClient(client)
    setEdits({})
  }

  function handleFieldEdit(fieldName, val) {
    setEdits({
      ...edits,
      [fieldName]: val,
    })
  }

  function handleSave() {
    onSave(edits)
  }

  //TODO: ref for field names. Only update when props change

  return (
    <div className="building">
      <Field
        name="Client"
        type={fieldType.enum}
        options={clients}
        val={client?.id}
        isEditing={true}
        onChange={handleClientChange}
      />

      {fields.map(field => {
        <Field
          key={field.id}
          name={field.name}
          type={field.type}
          options={field.options}
          val={edits[field.name]}
          isEditing={true}
          onChange={val => handleFieldEdit(field.name, val)}
        />
      })}

      <div className="building-controls">
        <>
          <BuildingControl onClick={handleSave}>
            Save
          </BuildingControl>
          <BuildingControl onClick={onCancel}>
            Cancel
          </BuildingControl>
        </>
      </div>
    </div>
  );
}


export default NewBuilding;