
import { GoogleGenAI } from '@google/genai';
import { Product } from '../types';

// IMPORTANT: Do not expose this key publicly in a real application.
// This should be handled via environment variables on a server.
// We assume `process.env.API_KEY` is configured in the execution environment.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey! });

export const suggestDailySpecial = async (products: Product[]): Promise<string> => {
  if (!apiKey) {
    return "Gemini API key is not configured. This feature is unavailable.";
  }

  const productList = products.map(p => `- ${p.name} (Stock: ${p.stock})`).join('\n');
  
  const prompt = `
    You are a marketing assistant for "Maiyogan Bakery", a local Indian bakery. 
    Your task is to suggest a creative "Daily Special" promotion to attract customers and sell items that are high in stock.
    
    Here are the items with high stock today:
    ${productList}

    Based on this list, create a short, catchy, and appealing promotional message for the daily special. It could be a combo offer, a discount on a specific item, or a creative new way to present them.
    
    Your response should be:
    1. Brief and to the point (2-3 sentences).
    2. Sound friendly and appealing to customers.
    3. Be formatted as plain text.

    Example format:
    "🌟 Maiyogan's Special Today! 🌟
    Enjoy our fluffy Veg Puffs with a hot tea for just ₹30! It's the perfect evening snack. Grab this delicious combo before it's gone!"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get suggestion from AI.");
  }
};
