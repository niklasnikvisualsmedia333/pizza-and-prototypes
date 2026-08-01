import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CompaniesPage from './pages/CompaniesPage';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CompaniesPage />
  </StrictMode>,
);

