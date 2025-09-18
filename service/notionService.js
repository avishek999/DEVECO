import { Client } from "@notionhq/client";
import { NOTION_TOKEN } from "../config/config.js";




const notion = new Client({ auth:NOTION_TOKEN });

/**
 * Get all Notion pages created/edited in the last 24h
 */
export async function getNotesLast24h() {
  const notes = [];
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  let cursor = undefined;
  do {
    const res = await notion.search({
      filter: { value: "page", property: "object" },
      page_size: 100,
      start_cursor: cursor,
    });

    console.log(res);
    

    for (const page of res.results) {
      const lastEdited = new Date(page.last_edited_time);
      const created = new Date(page.created_time);

      if (lastEdited >= since || created >= since) {
        notes.push({
          id: page.id,
          url: page.url,
          created: page.created_time,
          edited: page.last_edited_time,
        });
      }
    }

    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return notes;
}