import { getNotesLast24h } from "./service/notionService.js";

(async () => {
  const notes = await getNotesLast24h();
  console.log("Notes from last 24h:", notes);
})();