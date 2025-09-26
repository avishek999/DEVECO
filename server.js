import { sendEMail } from "./service/emailService.js";
import { generateTextAndImage } from "./service/geminiService.js";
import { getUserEvents } from "./service/githubService.js";
import { postOnlyTextInLinkedIn } from "./service/linkdedInService.js";
import { getNotesLast24h } from "./service/notionService.js";
import { postTextTweet } from "./service/xService.js";

async function main() {
  const githubEvent = await getUserEvents();
  const notionEvent = await getNotesLast24h();

  const geminiResult = await generateTextAndImage(githubEvent, notionEvent);

    const mail = sendEMail("AUTOMAATION SCRIPT", geminiResult); 

  const post = JSON.parse(geminiResult);

  //   const linkedInPost = await postOnlyTextInLinkedIn(post.linkedin);

  //   const xPost = await postTextTweet(post.x);

  console.log(post);
} 

main();
