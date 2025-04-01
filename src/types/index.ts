export interface DenainaLocation {
    id: string;
    title: string;
    denainaName: string;
    denainaMeaning: string;
    coordinates: [number, number];
    description: string[]; 
    culture: string[];
    media: string[];
    videoUrl?: string;
    audioUrl?: string;
    backgroundImage?: string;
  }
