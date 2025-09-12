import {
  LINKEDIN,
  LINKEDIN_TEXT_ONLY_API,
  LINKEDIN_BASE_URL,
} from "../config/config.js";
import axios from "axios";

// ===================== interceptor =====================

const linkedinAPI = axios.create({
  baseURL: LINKEDIN_BASE_URL,
  headers: {
    Authorization: `Bearer ${LINKEDIN.LINKEDIN_TOKEN}`,
    "Content-Type": "application/json",
  },
});

linkedinAPI.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("LinkedIn API error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

// ===================== API START =====================
export async function postLinkedIn(message) {
  try {
    const res = await linkedinAPI.post(LINKEDIN_TEXT_ONLY_API, {
      author: LINKEDIN.LINKEDIN_PERSON_URN,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: message },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    });
    console.log("✅ Posted to LinkedIn:", res.data);
  } catch (error) {
    console.error(
      "❌ LinkedIn post failed:",
      error.response?.data || error.message
    );
  }
}
