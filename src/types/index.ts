export type HogwartsHouse = 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw';

export type MoodState = 
  | 'happy' 
  | 'sad' 
  | 'excited' 
  | 'anxious' 
  | 'focused' 
  | 'relaxed' 
  | 'creative' 
  | 'tired';

export interface AIPersonality {
  house: HogwartsHouse;
  name: string;
  description: string;
  systemPrompt: string;
  specialties: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mood?: MoodState;
  house?: HogwartsHouse;
}

export interface UserSettings {
  house: HogwartsHouse;
  currentMood: MoodState;
  voiceEnabled: boolean;
  aiPersonality: AIPersonality;
  theme: 'dark' | 'light';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  house?: HogwartsHouse;
  createdAt: Date;
  completedAt?: Date;
  points: number;
}

export interface FashionAdvice {
  id: string;
  category: string;
  advice: string;
  houseTheme: HogwartsHouse;
  season?: string;
  occasion?: string;
  imageUrl?: string;
}

export interface HouseTheme {
  name: HogwartsHouse;
  displayName: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  description: string;
  motto: string;
}