import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Welcome from 'cpnt/welcome';

const container = document.getElementById('ndpv-welcome');
const root = createRoot(container);
root.render(
    <StrictMode>
        <Welcome />
    </StrictMode>
);
