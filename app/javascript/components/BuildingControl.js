import React from "react";

function BuildingControl({ onClick, disabled, children }) {
  return (
    <button
      className="building-control"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BuildingControl;