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
      const result = await model.generateContent(`
        You are an expert on iconic album covers. Based on this visual description: "${input}", identify the album cover that best matches.
        
        Examples:
        "prism with rainbow light" → Pink Floyd - Dark Side of the Moon (9.5)
        "knit orange toy head" → Sonic Youth - Dirty (8.8)
        "baby in pool" → Nirvana - Nevermind (8.1)
        "baby" → Nirvana - Nevermind (3.0)
        "man smoking cigarette" → Arctic Monkeys - Whatever People Say I Am, That\'s What I\'m Not"
        "house on the street, green lighting" → American Football - American Football (8.5)

        
        Now identify: "${input}"
        Return format: Artist - Album Title (Confidence score)
        
        Rules:
        - Focus on distinctive visual elements
        - Return your best match even if confidence is low
        - Give honest confidence scores (1-10)
        **IMPORTANT** You have to return an answer IN THE RETURN FORMAT EVEN IF YOU ARE NOT CONFIDENT IN IT
        `);
        
      const response = await result.response;
      setOutput(await response.text());
    } catch (err) {
      console.error("Gemini error:", err);
      setOutput("Error contacting Gemini.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <label className="block">
        <span className="text-sm text-gray-300">Ask Gemini:</span>
        <input
          type="text"
          className="mt-1 w-full rounded-md bg-zinc-800 text-white border border-zinc-600 px-4 py-2 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Generate a playlist for a rainy day..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-md shadow"
      >
        Ask
      </button>

      <div className="bg-zinc-900 p-4 rounded text-sm text-gray-100 whitespace-pre-wrap border border-zinc-700">
        {output}
      </div>
    </form>
  );
}
