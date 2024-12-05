import React from "react";

function BuildingControl({ onClick, children }) {
  return (
    <button
      className="building-control"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BuildingControl;