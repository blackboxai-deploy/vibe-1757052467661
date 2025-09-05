'use client';

import { useState, useEffect, useCallback } from 'react';
import { HogwartsHouse, MoodState, UserSettings } from '@/types';
import { getMagicalCssVars } from '@/lib/theme-utils';

const DEFAULT_SETTINGS: UserSettings = {
  house: 'gryffindor',
  currentMood: 'happy',
  voiceEnabled: true,
  aiPersonality: {
    house: 'gryffindor',
    name: 'Godric the Brave',
    description: 'A courageous and inspiring AI companion',
    systemPrompt: 'Default system prompt',
    specialties: ['motivation', 'courage']
  },
  theme: 'dark'
};

export function useMagicalTheme() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('magical-settings');
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('magical-settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings]);

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    const cssVars = getMagicalCssVars(settings.house, settings.currentMood);
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
  }, [settings.house, settings.currentMood]);

  const changeHouse = useCallback(async (newHouse: HogwartsHouse) => {
    setIsTransitioning(true);
    
    // Animate transition
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSettings(prev => ({
      ...prev,
      house: newHouse,
      aiPersonality: {
        ...prev.aiPersonality,
        house: newHouse
      }
    }));
    
    setIsTransitioning(false);
  }, []);

  const changeMood = useCallback(async (newMood: MoodState) => {
    setIsTransitioning(true);
    
    // Animate transition
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setSettings(prev => ({
      ...prev,
      currentMood: newMood
    }));
    
    setIsTransitioning(false);
  }, []);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    isTransitioning,
    changeHouse,
    changeMood,
    updateSettings,
    resetToDefaults,
    cssVars: getMagicalCssVars(settings.house, settings.currentMood)
  };
}