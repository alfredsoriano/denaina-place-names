import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
export interface DenainaLocation {
  id: string;
  title: string;
  denainaName: string;
  denainaMeaning: string;
  coordinates: [number, number];
  description: string[]; 
  culture: string[];
  media: string[];
  citations: string[];
  videoUrl?: string;
  audioUrl?: string;
  audioUrlculture?: string;
  backgroundImage?: string;
  isInDevelopment: boolean;
}
