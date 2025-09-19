import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;

// ======================  ENV KEYS ==========================

export const LINKEDIN = {
  LINKEDIN_TOKEN: process.env.LINKEDIN_TOKEN,
  LINKEDIN_PERSON_URN: process.env.LINKEDIN_PERSON_URN,
};

export const X = {
  X_API_KEY: process.env.X_API_KEY,
  X_API_SECRET: process.env.X_API_SECRET,
  X_ACCESS_TOKEN: process.env.X_ACCESS_TOKEN,
  X_ACCESS_SECRET: process.env.X_ACCESS_SECRET,
};

export const GITHUB = {
  token: process.env.GITHUB_TOKEN,
  username: process.env.GITHUB_USERNAME,
};

export const NOTION_TOKEN = process.env.NOTION_TOKEN;


export const GEMINI_API = process.env.GEMINI_API

// ======================  LinkedIn APIS ==========================

export const LINKEDIN_BASE_URL = "https://api.linkedin.com/";
export const LINKEDIN_TEXT_ONLY_API = LINKEDIN_BASE_URL + "v2/ugcPosts";
export const LINKEDIN__REGISTER_IMAGE_API =
  LINKEDIN_BASE_URL + "v2/assets?action=registerUpload";
