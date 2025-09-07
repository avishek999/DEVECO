import { LINKEDIN, LINKEDIN_API } from "../config/config.js"
import axios from "axios";



export async function postLinkedIn(message) {
    try {
        const res = await axios.post(
          LINKEDIN_API,{
            author:LINKEDIN.LINKEDIN_PERSON_URN,
            lifecycleState: "PUBLISHED",
              specificContent: {
              "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: message },
            shareMediaCategory: "NONE"
          }
        },
         visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        },
        
          },
           {
        headers: {
          Authorization: `Bearer ${LINKEDIN.LINKEDIN_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
          
        );
        console.log("✅ Posted to LinkedIn:", res.data);
        
    } catch (error) {
            console.error("❌ LinkedIn post failed:", error.response?.data || error.message);
    }
}