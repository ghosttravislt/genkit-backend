import express from "express";
import cors from "cors";
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { gemini20Flash } from "@genkit-ai/googleai";

const app = express();
app.use(cors());
app.use(express.json());

// initialising the AI pluging

const chat = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyB9xt6r3Mhqy_Fc4dS8JisNIq09dAF1Qm4" })],
  model: googleAI.model("gemini-2.5-flash"),
});

app.post("/api/chat", async (req, res) => {
  try {
    // assigning prompt to req.body
    const { prompt } = req.body;

    // // checkig if prompt is empty
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    //   connecting model with prompt
    const { output } = await chat.generate({
      prompt,
      output: { format: "text" },
    });

    // storing output in json format
    res.json({ output });
    // console.log(output.output);
  } catch (error) {
    console.error("Genkit error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log("server running");
});
