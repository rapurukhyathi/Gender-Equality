
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  BIAS_CHECKER = 'BIAS_CHECKER',
  HARASSMENT_DETECTOR = 'HARASSMENT_DETECTOR',
  SAFETY_CHAT = 'SAFETY_CHAT',
  DOCUMENTATION = 'DOCUMENTATION'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface BiasAnalysisResult {
  score: number;
  detectedBiases: string[];
  suggestions: string[];
  originalText: string;
}

export interface HarassmentAnalysisResult {
  isHarassment: boolean;
  severity: 'Low' | 'Medium' | 'High';
  category: string;
  explanation: string;
}
