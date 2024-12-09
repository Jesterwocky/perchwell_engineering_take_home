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

function Building({ building, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [edits, setEdits] = useState({});

  const addressField = defaultBuildingFields.find(f => f.name === "address")
  const bodyFields = [
    ...defaultBuildingFields.filter(f => f.name !== "address"),
    ...(building?.custom_fields ?? [])
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
    })
  };

  function handleSave() {
    onSave(edits)
    setIsEditing(false);
  };

  return (
    <div className="building">
      <div className="client-name">
        {titleify(building.client_name)}
      </div>
  
      {isEditing
        ?
          <Field
            {...addressField}
            val={building.address}
            isEditing={true}
            onChange={val => handleFieldEdit(addressField.name, val)}
          />
        :
          <div className="address-display">
            {building.address}
          </div>
      }

      {bodyFields.map(field => (
        <Field
          key={`${building.id}-${field.name}`}
          {...field}
          val={building[field.name]}
          isEditing={isEditing}
          onChange={val => handleFieldEdit(field.name, val)}
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