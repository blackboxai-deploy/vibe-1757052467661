export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

export const defaultVoiceSettings: VoiceSettings = {
  rate: 1,
  pitch: 1,
  volume: 0.8
};

export class VoiceManager {
  private synthesis: SpeechSynthesis;
  private recognition: any;
  private settings: VoiceSettings;
  private isListening: boolean = false;

  constructor(settings: VoiceSettings = defaultVoiceSettings) {
    this.synthesis = window.speechSynthesis;
    this.settings = settings;
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
  }

  async speak(text: string, magicalEffect: boolean = true): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not available'));
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      // Add magical flourishes to the text
      const magicalText = magicalEffect ? this.addMagicalEffects(text) : text;

      const utterance = new SpeechSynthesisUtterance(magicalText);
      
      // Apply voice settings
      utterance.rate = this.settings.rate;
      utterance.pitch = this.settings.pitch;
      utterance.volume = this.settings.volume;
      
      if (this.settings.voice) {
        utterance.voice = this.settings.voice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synthesis.speak(utterance);
    });
  }

  async listen(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not available'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        resolve(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis?.getVoices() || [];
  }

  updateSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  private addMagicalEffects(text: string): string {
    // Add pauses and emphasis for magical effect
    return text
      .replace(/\./g, '... ') // Add pauses after sentences
      .replace(/!/g, '! ') // Add pauses after exclamations
      .replace(/magic|spell|enchant/gi, '✨ $& ✨') // Add sparkle around magical words
      .replace(/^/, '🌟 ') // Add star at beginning
      .replace(/$/, ' 🌟'); // Add star at end
  }

  get isVoiceSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  get isSpeechRecognitionSupported(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  get currentlyListening(): boolean {
    return this.isListening;
  }
}

// Magical voice commands
export const MAGICAL_COMMANDS = {
  CHAT: ['lumos chat', 'open chat', 'talk to me'],
  FASHION: ['accio fashion', 'fashion advice', 'style help'],
  PRODUCTIVITY: ['tempus productivity', 'help me focus', 'task magic'],
  MOOD: ['revelio mood', 'change mood', 'mood magic'],
  HOUSE: ['sorting hat', 'change house', 'house selection'],
  STOP: ['silencio', 'stop', 'quiet'],
  HELP: ['help', 'what can you do', 'commands']
};

export function detectMagicalCommand(transcript: string): string | null {
  const lowerTranscript = transcript.toLowerCase();
  
  for (const [command, phrases] of Object.entries(MAGICAL_COMMANDS)) {
    if (phrases.some(phrase => lowerTranscript.includes(phrase))) {
      return command;
    }
  }
  
  return null;
}

export function createMagicalVoiceManager(settings?: Partial<VoiceSettings>): VoiceManager {
  const magicalSettings = {
    ...defaultVoiceSettings,
    ...settings,
    rate: 0.9, // Slightly slower for magical effect
    pitch: 1.1 // Slightly higher pitch for ethereal quality
  };
  
  return new VoiceManager(magicalSettings);
}