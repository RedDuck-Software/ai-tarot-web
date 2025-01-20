import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from './app';

const element = document.getElementById('root');
if (!element) throw new Error('No root element');
createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
