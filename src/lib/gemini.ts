import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is available
const apiKey = process.env.GEMINI_API_KEY || "dummy-key-for-build";

if (apiKey === "dummy-key-for-build") {
  console.warn("GEMINI_API_KEY is not defined. Please set it in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

export class AIError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "AIError";
    this.statusCode = statusCode;
  }
}

export async function generateContent(prompt: string): Promise<string> {
  try {
    // USING 'gemini-flash-latest' BECAUSE 'gemini-1.5-flash' WAS RETURNING 404
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON formatting if Gemini returned markdown block
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);

    // Parse specific error codes if available from the Google AI SDK
    const errorMessage = error instanceof Error ? error.message : String(error);
    let statusCode = 500;

    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota") || errorMessage.toLowerCase().includes("rate limit")) {
      statusCode = 429;
    } else if (errorMessage.includes("404") || errorMessage.toLowerCase().includes("not found")) {
      statusCode = 404;
    }

    throw new AIError(
      "Yapay zeka servisinde geçici bir kesinti yaşanıyor. Lütfen daha sonra tekrar deneyin.",
      statusCode
    );
  }
}