import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API } from "../config/config.js";
import fs from "fs";

const genAI = new GoogleGenerativeAI(GEMINI_API);

// text-only model
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// text+image preview model
const imgModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-image-preview",
});

export async function generateTextAndImage(commit, notes) {
  const baseTextContext = `
You are an assistant that writes social media updates.
You have two inputs:
- Recent GitHub commits: ${JSON.stringify(commit, null, 2)}
- Recent Notion notes: ${JSON.stringify(notes, null, 2)}

From this, create two types of posts:
1. **X/Twitter Post** (≤ 280 chars, short, engaging, casual).
2. **LinkedIn Post** (professional, detailed, highlights progress, collaboration, or learning).
Both should summarize my last 24h work updates in a human tone.
Avoid hashtags unless natural. Do not add emojis unless they fit.
`;

  const baseImgContext = `
Use the context below to generate a single illustrative image
that visually represents the work updates in a clean, modern style.

Context:
- Recent GitHub commits: ${JSON.stringify(commit, null, 2)}
- Recent Notion notes: ${JSON.stringify(notes, null, 2)}
`;

  // --- Generate text ---
  const textResult = await textModel.generateContent(baseTextContext);
  console.log("Text Output:\n", textResult.response.text());

  // --- Generate image ---
  const imgResult = await imgModel.generateContent({
    contents: [{ role: "user", parts: [{ text: baseImgContext }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  });

  // The image is usually base64 inline data inside candidates
  const imagePart = imgResult.response.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.mimeType?.startsWith("image/")
  );

  if (imagePart) {
    fs.writeFileSync(
      "summary.png",
      Buffer.from(imagePart.inlineData.data, "base64")
    );
    console.log("✅ Image saved to summary.png");
  } else {
    console.log("⚠️ No image returned by model");
  }
}

import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({apiKey:GEMINI_API});

const prompt =
  "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";

export const getImage = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
    }
  }
};
