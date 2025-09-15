import {
  LINKEDIN,
  LINKEDIN_TEXT_ONLY_API,
  LINKEDIN_BASE_URL,
  LINKEDIN__REGISTER_IMAGE_API,
} from "../config/config.js";
import axios from "axios";
import fs from "fs";
import path from "path";

// ===================== interceptor =====================
const linkedinAPI = axios.create({
  baseURL: LINKEDIN_BASE_URL,
  headers: {
    Authorization: `Bearer ${LINKEDIN.LINKEDIN_TOKEN}`,
    "Content-Type": "application/json",
    "X-Restli-Protocol-Version": "2.0.0",
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
export async function postOnlyTextInLinkedIn(message) {
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

export async function postTextWithImageInLinkedIn(imagePath, message) {
  try {
    // 1. Register image upload
    const registerResp = await linkedinAPI.post(LINKEDIN__REGISTER_IMAGE_API, {
      registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
        owner: LINKEDIN.LINKEDIN_PERSON_URN,
        serviceRelationships: [
          {
            relationshipType: "OWNER",
            identifier: "urn:li:userGeneratedContent",
          },
        ],
      },
    });

    const uploadInfo =
      registerResp.data.value.uploadMechanism[
        "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
      ];
    const uploadUrl = uploadInfo.uploadUrl;
    const asset = registerResp.data.value.asset;

    // 2. Upload binary image
    const imageBuffer = fs.readFileSync(path.resolve(imagePath));
    const contentType = imagePath.endsWith(".png") ? "image/png" : "image/jpeg";

    await linkedinAPI.put(uploadUrl, imageBuffer, {
      headers: {
        "Content-Type": contentType,
      },
    });

    // 3. Create the LinkedIn post with text + image
    const res = await linkedinAPI.post(LINKEDIN_TEXT_ONLY_API, {
      author: LINKEDIN.LINKEDIN_PERSON_URN,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: message },
          shareMediaCategory: "IMAGE",
          media: [
            {
              status: "READY",
              media: asset,
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    });

    console.log("✅ Posted text + image to LinkedIn:", res.data);
  } catch (error) {
    console.error(
      "❌ LinkedIn post with image failed:",
      error.response?.data || error.message
    );
  }
}
