import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Invoice from 'out-cpnt/invoice';

const container = document.getElementById('ndpv-invoice');
const root = createRoot(container);
root.render(
    <StrictMode>
        <Invoice />
    </StrictMode>
);
