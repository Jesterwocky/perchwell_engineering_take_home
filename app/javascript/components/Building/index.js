// Library
import React, { useState } from 'react';

// Helpers
import { titleify } from '../../helpers/format';
import { defaultBuildingFields } from '../../constants';

// Components
import Field from './Field';
import BuildingControl from '../BuildingControl';

// Styles
import './styles.css';

function Building({ building, customFields }) {
  const { address, client_name: clientName } = building;

  const [isEditing, setIsEditing] = useState(false);
  const [edits, setEdits] = useState({});

  const addressField = defaultBuildingFields.find(f => f.name === "address")
  const otherFields = defaultBuildingFields.filter(f => f.name !== "address")
  const fields = [
    ...otherFields,
    ...customFields
  ]

  function handleStartEdit() {
    setIsEditing(true);
  };

  function handleStopEdit() {
    setIsEditing(false);
    setEdits({});
  };

  function handleFieldEdit(fieldName, val) {
    setEdits({
      ...edits,
      [fieldName]: val,
    });
  };

  function handleSave() {
    // TODO: implement API call
    setIsEditing(false);
  };

  return (
    <div className="building">
      <div className="client-name">{titleify(clientName)}</div>
  
      {isEditing
        ?
          <Field
            {...addressField}
            val={address}
            isEditing={true}
            onChange={val => handleFieldEdit(addressField, val)}
          />
        :
          <div className="address-display">{address}</div>
      }

      {fields.map(field => (
        <Field
          key={field.id}
          {...field}
          val={building[field.name]}
          isEditing={isEditing}
          onChange={val => handleFieldEdit(field, val)}
        />
      ))}

      <div className="building-controls">
        {isEditing
          ?
            <>
              <BuildingControl onClick={handleSave}>
                Save
              </BuildingControl>
              {" "}
              <BuildingControl onClick={handleStopEdit}>
                Cancel
              </BuildingControl>
            </>
          :
            <BuildingControl onClick={handleStartEdit}>
              Edit
            </BuildingControl>
        }
      </div>
    </div>
  );
}


export default Building;