import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API } from "../config/config.js";
import fs from "fs";

const genAI = new GoogleGenerativeAI(GEMINI_API);

// text-only model
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// text+image preview model
// const imgModel = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash-image-preview",
// });

export async function generateTextAndImage(commit, notes) {
  const baseTextContext = `
You are an assistant that writes social media updates for my daily developer journey.
Inputs:
- GitHub commits (last 24h): ${JSON.stringify(commit, null, 2)}
- Notion notes (last 24h): ${JSON.stringify(notes, null, 2)}

Your task:
1. Write **two posts**:
   - **X/Twitter Post**: ≤ 280 characters, casual, concise, engaging.
   - **LinkedIn Post**: professional, thoughtful, highlights progress, challenges, or learnings.
2. Do **NOT**:
   - Mention "commits" or "Notion" explicitly.
   - Insert raw links unless the input text is naturally link-based.
   - Say things like "No commits" or "add topic here".
3. Write in a natural human tone, as if I personally posted it.
4. Avoid hashtags/emojis unless they fit naturally.

Output JSON format only:
{
  "x": "your twitter style post",
  "linkedin": "your linkedin style post"
}
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
  let rawText = textResult.response.text();
  rawText = rawText.replace(/```json|```/g, "").trim();

  return rawText;
  // --- Generate image ---
  // const imgResult = await imgModel.generateContent({
  //   contents: [{ role: "user", parts: [{ text: baseImgContext }] }],
  //   generationConfig: { responseModalities: ["IMAGE"] },
  // });

  // The image is usually base64 inline data inside candidates
  // const imagePart = imgResult.response.candidates?.[0]?.content?.parts?.find(
  //   (p) => p.inlineData?.mimeType?.startsWith("image/")
  // );

  // if (imagePart) {
  //   fs.writeFileSync(
  //     "summary.png",
  //     Buffer.from(imagePart.inlineData.data, "base64")
  //   );
  //   console.log("✅ Image saved to summary.png");
  // } else {
  //   console.log("⚠️ No image returned by model");
  // }
}
