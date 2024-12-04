// Entry point for the build script in your package.json
import React from 'react';
import ReactDOM from 'react-dom/client';
import Buildings from './components/Buildings';

document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('react-root'))
  root.render(<Buildings />)
});

