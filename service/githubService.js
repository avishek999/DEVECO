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

    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const commits = res.data
      .filter((e) => e.type === "PushEvent" && new Date(e.created_at) > last24h)
      .flatMap((e) =>
        e.payload.commits.map((c) => ({
          repo: e.repo.name,
          sha: c.sha,
          message: c.message,
          url: c.url,
          date: e.created_at,
        }))
      );

    console.log(commits.length ? commits : "No commits in last 24h 🚫");
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}
