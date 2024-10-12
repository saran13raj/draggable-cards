import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './index.css';

async function enableMocking() {
	const { mockServer } = await import('./mocks/browser');

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return mockServer.start();
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(<App />);
});
