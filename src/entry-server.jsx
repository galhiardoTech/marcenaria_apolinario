import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from './App';

export function render(pathname) {
    return renderToString(
        <MemoryRouter initialEntries={[pathname]}>
            <AppContent />
        </MemoryRouter>,
    );
}
