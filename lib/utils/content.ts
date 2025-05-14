import { Content } from "../types";

const youtubeBaseUrl = "https://youtu.be/";
const tiktokBaseUrl = "https://vt.tiktok.com/";
const twitterBaseUrl = "https://x.com/";
const instagramBaseUrl = "https://www.instagram.com/";
const redditBaseUrl = "https://www.reddit.com/";
const quoraBaseUrl = "https://www.quora.com/";
const linkedinBaseUrl = "https://www.linkedin.com/";
const facebookBaseUrl = "https://www.facebook.com/";
const mediumBaseUrl = "https://medium.com/";

export function getContentSource(source: string): string {
  if (source.startsWith(youtubeBaseUrl)) return "youtube";
  if (source.startsWith(tiktokBaseUrl)) return "tiktok";
  if (source.startsWith(twitterBaseUrl)) return "twitter";
  if (source.startsWith(instagramBaseUrl)) return "instagram";
  if (source.startsWith(redditBaseUrl)) return "reddit";
  if (source.startsWith(quoraBaseUrl)) return "quora";
  if (source.startsWith(linkedinBaseUrl)) return "linkedin";
  if (source.startsWith(facebookBaseUrl)) return "facebook";
  if (source.startsWith(mediumBaseUrl)) return "medium";
  return "unknown";
}

export function extractYoutubeIdFromUrl(url: string): string {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = regex.exec(url);
  return match ? match[1] : "dQw4w9WgXcQ";
}

export function extractInstagramIdFromUrl(url: string): string {
  const regex = /(?:\/p\/|\/tv\/|\/reel\/)([0-9A-Za-z_-]+)/;
  const match = regex.exec(url);
  return match ? match[1] : "dQw4w9WgXcQ";
}
