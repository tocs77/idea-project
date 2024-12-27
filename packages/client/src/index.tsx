import { createRoot } from 'react-dom/client';
import { App } from './App';

import { version } from './version';

console.log(`Frontend version ${version}`);

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);

root.render(
  <App />,
);
