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
