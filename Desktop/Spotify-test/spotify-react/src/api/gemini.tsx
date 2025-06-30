import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config";

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

async function main() {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent("Explain how AI works in a few words");

  const response = await result.response;
  const text = await response.text();

  console.log(text);
}

main();
