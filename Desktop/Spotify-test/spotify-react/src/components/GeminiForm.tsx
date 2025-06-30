import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GeminiForm() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Ask something...");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOutput("Thinking...");

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      setOutput(await response.text());
    } catch (err) {
      console.error("Gemini error:", err);
      setOutput("Error contacting Gemini.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm">Ask Gemini:</span>
        <input
          type="text"
          className="border px-3 py-2 w-full mt-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Submit
      </button>
      <p className="mt-4">{output}</p>
    </form>
  );
}
