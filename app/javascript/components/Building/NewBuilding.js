// Library
import React, { useState } from 'react';

// Helpers
import { fieldType, defaultBuildingFields } from '../../constants';

// Components
import Field from './Field'
import BuildingControl from '../BuildingControl';


// Styles
import './styles.css';

function NewBuilding({ onSave, onCancel, clients, isLoading }) {
  const [selectedClient, selectClient] = useState(null)
  const [values, setValues] = useState({})

  const fields = [
    ...defaultBuildingFields,
    ...(selectedClient?.custom_fields ?? []),
  ];

  function handleClientChange(clientName) {
    selectClient(clients.find(c => c.name === clientName));
  }

  function handleFieldChange(fieldName, val) {
    setValues({
      ...values,
      [fieldName]: val,
    })
  }

  function handleSave() {
    onSave({
      client_id: selectedClient.id,
      ...values
    })
  }

  return (
    <div className="building">
      <Field
        name="Client"
        type={fieldType.enum}
        options={clients.map(c => c.name)}
        val={selectedClient?.name}
        isEditing={true}
        onChange={handleClientChange}
      />

      {selectedClient && fields.map(field => (
        <Field
          key={field.id}
          {...field}
          val={values[field.name]}
          isEditing={true}
          onChange={val => handleFieldChange(field.name, val)}
        />
      ))}

      <div className="building-controls">
        <>
          <BuildingControl
            onClick={handleSave}
            disabled={!selectedClient || !values.address}
          >
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