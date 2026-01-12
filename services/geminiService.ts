
import { GoogleGenAI, Type } from "@google/genai";
import { BiasAnalysisResult, HarassmentAnalysisResult } from "../types";

const API_KEY = process.env.API_KEY || '';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async analyzeGenderBias(text: string): Promise<BiasAnalysisResult> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following text (job description or digital content) for gender bias. 
      Identify terms that are traditionally male-coded or female-coded.
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Neutrality score from 0-100" },
            detectedBiases: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            originalText: { type: Type.STRING }
          },
          required: ["score", "detectedBiases", "suggestions", "originalText"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  }

  async detectHarassment(text: string): Promise<HarassmentAnalysisResult> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate this text for potential online harassment, misogyny, or gender-based hate speech.
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isHarassment: { type: Type.BOOLEAN },
            severity: { type: Type.STRING, description: "Low, Medium, or High" },
            category: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["isHarassment", "severity", "category", "explanation"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  }

  async getSafetyAdvice(query: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: "You are a specialized safety agent for UN SDG 5: Gender Equality. Provide empathetic, practical, and safe advice regarding online harassment, workplace discrimination, and gender rights. Always encourage users to seek professional or legal help for serious issues."
      }
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  }
}

export const geminiService = new GeminiService();
