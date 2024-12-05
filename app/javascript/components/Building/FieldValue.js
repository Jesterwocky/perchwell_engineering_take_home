// Library
import React from 'react';
import { fieldType } from '../../constants';

function FieldValue({ type, val, options, handleEdit }) {
  function handleChange(e) {
    handleEdit(e.target.value)
  }

  switch (type) {
    case fieldType.number:
      return (
        <input
          defaultValue={val}
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          onChange={handleChange}
        />
      )
    case fieldType.enum:
      return (
        <select
          defaultValue={val}
          onChange={handleChange}
        >
          {(options ?? []).map(option => (
            <option
              key={option?.id ?? option?.name ?? option}
              value={option?.id ?? option?.name ?? option}
            >
              {option?.name ?? option}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          defaultValue={val}
          type="text"
          onChange={handleChange}
        />
      );
  };
};

export default FieldValue;