import React from 'react';
import { createRoot }  from 'react-dom/client';
import './styles/index.css'; // Import your global CSS or SCSS styles here
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
