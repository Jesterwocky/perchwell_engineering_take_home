// Library
import React from 'react';

// Helpers
import { stringify, sentenceify } from '../../helpers/format';

// Components
import FieldValue from './FieldValue';

function Field({ type, options, name, val, isEditing, onChange }) {
  return (
    <div className='field-container'>
      <span className="field-name">
        {sentenceify(name)}:
      </span>{" "}

      {isEditing
        ?
          <FieldValue
            type={type}
            val={val}
            options={options}
            onChange={onChange}
          />
        : stringify(val)
      }
    </div>
  )
}

export default Field;