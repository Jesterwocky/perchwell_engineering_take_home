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
  const { id, address, client_name: client, ...otherFields } = building;

  const [isEditing, setIsEditing] = useState(false);
  const [edits, setEdits] = useState({});

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

  function getOptions(fieldName) {
    const defaultField = defaultBuildingFields.find(f => f.name === fieldName);

    if (defaultField) {
      return defaultField.options;
    } else {
      const field = customFields.find(customField => customField.name === fieldName);
      return field?.options ?? [];
    };
  };

  //TODO: ref for field names. Only update when props change

  return (
    <div className="building">
      <div className="client-name">{titleify(client)}</div>
  
      <h2>{address}</h2>

      {Object.keys(otherFields).map(fieldName => (
        <Field
          key={`${client}-${address}-${fieldName}`}
          name={fieldName}
          val={otherFields[fieldName]}
          options={getOptions(fieldName)}
          isEditing={isEditing}
          onChange={val => handleFieldEdit(fieldName, val)}
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