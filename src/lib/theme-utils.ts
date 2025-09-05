import { HogwartsHouse, HouseTheme, MoodState } from '@/types';

export const houseThemes: Record<HogwartsHouse, HouseTheme> = {
  gryffindor: {
    name: 'gryffindor',
    displayName: 'Gryffindor',
    primary: '#D32F2F', // Deep red
    secondary: '#FFD700', // Gold
    accent: '#FFC107', // Amber
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)',
    text: '#ffffff',
    description: 'Brave, bold, and adventurous',
    motto: 'Courage above all'
  },
  slytherin: {
    name: 'slytherin',
    displayName: 'Slytherin',
    primary: '#2E7D32', // Deep green
    secondary: '#C0C0C0', // Silver
    accent: '#388E3C', // Emerald
    background: 'linear-gradient(135deg, #1a1a1a 0%, #1b2d1b 100%)',
    text: '#ffffff',
    description: 'Ambitious, cunning, and determined',
    motto: 'Greatness inspires envy'
  },
  hufflepuff: {
    name: 'hufflepuff',
    displayName: 'Hufflepuff',
    primary: '#F57F17', // Deep yellow
    secondary: '#5D4037', // Brown
    accent: '#FBC02D', // Yellow
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2a1b 100%)',
    text: '#ffffff',
    description: 'Loyal, patient, and kind',
    motto: 'Hard work and dedication'
  },
  ravenclaw: {
    name: 'ravenclaw',
    displayName: 'Ravenclaw',
    primary: '#1565C0', // Deep blue
    secondary: '#9E9E9E', // Silver
    accent: '#1976D2', // Blue
    background: 'linear-gradient(135deg, #1a1a1a 0%, #1b1f2d 100%)',
    text: '#ffffff',
    description: 'Intelligent, wise, and witty',
    motto: 'Wit beyond measure'
  }
};

export const moodColors: Record<MoodState, { primary: string; secondary: string; effect: string }> = {
  happy: { primary: '#FFD700', secondary: '#FFC107', effect: 'glow-yellow' },
  sad: { primary: '#5C6BC0', secondary: '#3F51B5', effect: 'glow-blue' },
  excited: { primary: '#FF5722', secondary: '#F44336', effect: 'glow-red pulse' },
  anxious: { primary: '#9C27B0', secondary: '#673AB7', effect: 'glow-purple shimmer' },
  focused: { primary: '#2E7D32', secondary: '#4CAF50', effect: 'glow-green steady' },
  relaxed: { primary: '#00695C', secondary: '#009688', effect: 'glow-teal slow-pulse' },
  creative: { primary: '#E91E63', secondary: '#F06292', effect: 'glow-pink sparkle' },
  tired: { primary: '#616161', secondary: '#9E9E9E', effect: 'glow-gray dim' }
};

export const getHouseTheme = (house: HogwartsHouse): HouseTheme => {
  return houseThemes[house];
};

export const getMoodEffect = (mood: MoodState) => {
  return moodColors[mood];
};

export const generateMagicalGradient = (house: HogwartsHouse, mood?: MoodState): string => {
  const theme = getHouseTheme(house);
  const moodEffect = mood ? getMoodEffect(mood) : null;
  
  if (moodEffect) {
    return `linear-gradient(135deg, ${theme.primary} 0%, ${moodEffect.primary} 50%, ${theme.secondary} 100%)`;
  }
  
  return `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`;
};

export const getMagicalCssVars = (house: HogwartsHouse, mood?: MoodState) => {
  const theme = getHouseTheme(house);
  const moodEffect = mood ? getMoodEffect(mood) : null;
  
  return {
    '--house-primary': theme.primary,
    '--house-secondary': theme.secondary,
    '--house-accent': theme.accent,
    '--house-text': theme.text,
    '--mood-primary': moodEffect?.primary || theme.primary,
    '--mood-secondary': moodEffect?.secondary || theme.secondary,
    '--mood-effect': moodEffect?.effect || 'none',
    '--magical-gradient': generateMagicalGradient(house, mood)
  };
};