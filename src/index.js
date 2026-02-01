import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles-premium-mobile.css';  // ← ADD THIS LINE

console.log("🚀 React Frontend deployed via GitHub Actions to S3!");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
