// Library
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components
import Buildings from './components/Buildings';

// Styles
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('react-root'))
  root.render(<Buildings />)
});

