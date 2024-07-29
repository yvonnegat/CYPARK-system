// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingProvider } from './components/LoadingContext'; // Ensure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoadingProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LoadingProvider>
);

reportWebVitals();
