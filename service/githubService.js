import axios from "axios";
import { GITHUB } from "../config/config.js";

export async function getUserEvents() {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${GITHUB.username}/events`,
      {
        headers: {
          Authorization: `token ${GITHUB.token}`,
          "User-Agent": GITHUB.username,
        },
      }
    );

    // GitHub events are in res.data
    const events = res.data;

    const last24h =  Date.now() - 24 * 60 * 60 * 1000;

    const commits = events
      .filter((e) => e.type === "PushEvent" &&  Date.parse(e.created_at) > last24h)
      .flatMap((e) =>
        e.payload.commits.map((c) => ({
          repo: e.repo.name,
          sha: c.sha,
          message: c.message,
          url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
          date: e.created_at,
        }))
      );

    console.log(commits.length ? commits : "No commits in last 24h 🚫");

    return commits; // return commits array
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    return [];
  }
}
