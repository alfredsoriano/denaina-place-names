import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export interface DenainaLocation {
  id: string;
  title: string;
  denainaName: string;
  denainaMeaning: string;
  coordinates: [number, number];
  description: string; 
  imageUrl: string;
}
