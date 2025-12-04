import { GoogleGenAI, Type, Schema } from "@google/genai";
import { EstimationRequest, AIEstimateResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const estimateSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    totalEstimatedCost: { type: Type.NUMBER, description: "Total estimated cost of the project in USD" },
    currency: { type: Type.STRING, description: "Currency code, e.g., USD" },
    timelineMonths: { type: Type.NUMBER, description: "Estimated time to completion in months" },
    summary: { type: Type.STRING, description: "A professional summary of the estimation logic and key factors." },
    breakdown: {
      type: Type.ARRAY,
      description: "Detailed breakdown of costs",
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "Category name (e.g., Materials, Labor, Permits)" },
          cost: { type: Type.NUMBER, description: "Cost for this category" },
          description: { type: Type.STRING, description: "Short explanation of this cost" }
        },
        required: ["category", "cost", "description"]
      }
    }
  },
  required: ["totalEstimatedCost", "currency", "timelineMonths", "summary", "breakdown"]
};

export const generateConstructionEstimate = async (request: EstimationRequest): Promise<AIEstimateResponse> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are a senior civil engineer and construction cost estimator. 
    Please provide a detailed cost estimation for a construction project with the following details:
    
    - Project Type: ${request.projectType}
    - Location: ${request.location}
    - Total Area: ${request.areaSqFt} square feet
    - Number of Floors: ${request.floors}
    - Material Quality Tier: ${request.quality}
    
    Consider current market rates for labor and materials. 
    Be realistic about overheads, architectural fees, and structural requirements.
    Return the data strictly in the requested JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: estimateSchema,
        temperature: 0.2, // Low temperature for consistent, factual estimates
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AIEstimateResponse;
  } catch (error) {
    console.error("Estimation failed:", error);
    throw error;
  }
};
