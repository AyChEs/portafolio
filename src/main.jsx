import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppProvider } from './lib/app-context.jsx';
import { PaletteProvider } from './lib/palette-context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <PaletteProvider>
        <App />
      </PaletteProvider>
    </AppProvider>
  </StrictMode>
);
