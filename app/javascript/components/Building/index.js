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

function Building({ building, customFields, onSave }) {
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
  };

  function handleSave() {
    onSave(edits)
    setIsEditing(false);
  };

  return (
    <div className="building">
      <div className="client-name">{titleify(building.client_name)}</div>
  
      {isEditing
        ?
          <Field
            {...addressField}
            val={building.address}
            isEditing={true}
            onChange={val => handleFieldEdit(addressField, val)}
          />
        :
          <div className="address-display">{building.address}</div>
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