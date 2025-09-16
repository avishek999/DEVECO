import { TwitterApi } from "twitter-api-v2";
import { X } from "../config/config.js";

export const client = new TwitterApi({
  appKey: X.X_API_KEY,
  appSecret: X.X_API_SECRET,
  accessToken: X.X_ACCESS_TOKEN,
  accessSecret: X.X_ACCESS_SECRET,
});

export async function postTextTweet(text) {
  try {
    const tweet = await client.v2.tweet(text);
    console.log("Tweet posted:", tweet);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

export async function postTextWithImage(text, imagePath) {
  try {
    // Step 1: Upload image
    const mediaId = await client.v1.uploadMedia(imagePath); 

    // Step 2: Post tweet with text + image
    const tweet = await client.v2.tweet({
      text: text,
      media: { media_ids: [mediaId] },
    });

    console.log("Tweet with image posted:", tweet);
  } catch (error) {
    console.error("Error posting tweet with image:", error);
  }
}
