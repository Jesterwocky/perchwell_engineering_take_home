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

  const customFields = client?.custom_fields ?? []
  const fields = [
    ...defaultBuildingFields,
    ...customFields,
  ];

  function handleClientChange(clientId) {
    const client = clients.find(c => c.id === clientId);
    setClient(client)
    setEdits({ client_id: client.id })
  }

  function handleFieldEdit(field, val) {
    if (field.isDefault) {
      setEdits({
        ...edits,
        [field.name]: val,
      })
    } else {
      setEdits({
        ...edits,
        custom_fields: {
          ...edits.customFields,
          [field.id]: val
        }
      })
    }
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
        options={clients.map(c => ({ name: titleify(c.name), id: c.id }))}
        val={client?.id}
        isEditing={true}
        onChange={handleClientChange}
      />

      {client && fields.map(field => (
        <Field
          key={field.id}
          {...field}
          val={edits[field.name]}
          isEditing={true}
          onChange={val => handleFieldEdit(field, val)}
        />
      ))}

      <div className="building-controls">
        <>
          <BuildingControl onClick={handleSave} disabled={!client || !edits.address}>
            Save
          </BuildingControl>
          {" "}
          <BuildingControl onClick={onCancel}>
            Cancel
          </BuildingControl>
        </>
      </div>
    </div>
  );
}


export default NewBuilding;