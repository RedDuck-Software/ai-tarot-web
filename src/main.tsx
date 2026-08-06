import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from './app';

if (import.meta.env.DEV) {
  const _consoleError = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Each child in a list should have a unique')) return;
    _consoleError(...args);
  };
}

const element = document.getElementById('root');
if (!element) throw new Error('No root element.');
createRoot(element).render(<App />);
