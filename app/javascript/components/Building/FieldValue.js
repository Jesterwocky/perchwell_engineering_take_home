// Library
import React from 'react';
import { fieldType } from '../../constants';
import { sentenceify, titleify } from '../../helpers/format';

function FieldValue({ type, val, options, onChange }) {
  function handleChange(e) {
    onChange(e.target.value)
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
          <option value="">
            Select...
          </option>

          {(options ?? []).map(option => (
            <option key={option} value={option}>
              {titleify(option)}
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