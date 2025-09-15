import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;

// ======================  ENV KEYS ==========================

export const LINKEDIN = {
  LINKEDIN_TOKEN: process.env.LINKEDIN_TOKEN,
  LINKEDIN_PERSON_URN: process.env.LINKEDIN_PERSON_URN,
};

export const X = {
  X_BEARER_TOKEN: process.env.X_BEARER_TOKEN,
  apiSecret: process.env.TWITTER_API_SECRET,
};

// ======================  LinkedIn APIS ==========================

export const LINKEDIN_BASE_URL = "https://api.linkedin.com/";
export const LINKEDIN_TEXT_ONLY_API = LINKEDIN_BASE_URL + "v2/ugcPosts";
export const LINKEDIN__REGISTER_IMAGE_API =
  LINKEDIN_BASE_URL + "v2/assets?action=registerUpload";
