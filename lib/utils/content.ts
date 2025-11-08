const youtubeBaseUrl = "https://youtu.be/";
const youtubeWatchBaseUrl = "https://www.youtube.com/";
const youtubeMobileBaseUrl = "https://youtube.com/";
const tiktokBaseUrl = "https://vt.tiktok.com/";
const twitterBaseUrl = "https://x.com/";
const instagramBaseUrl = "https://www.instagram.com/";
const redditBaseUrl = "https://www.reddit.com/";
const quoraBaseUrl = "https://www.quora.com/";
const linkedinBaseUrl = "https://www.linkedin.com/";
const facebookBaseUrl = "https://www.facebook.com/";
const mediumBaseUrl = "https://medium.com/";
const blueskyBaseUrl = "https://bsky.app/";

export function getContentSource(source: string): string {
  if (
    source.startsWith(youtubeBaseUrl) ||
    source.startsWith(youtubeWatchBaseUrl) ||
    source.startsWith(youtubeMobileBaseUrl)
  )
    return "youtube";
  if (source.startsWith(tiktokBaseUrl)) return "tiktok";
  if (source.startsWith(twitterBaseUrl)) return "twitter";
  if (source.startsWith(instagramBaseUrl)) return "instagram";
  if (source.startsWith(redditBaseUrl)) return "reddit";
  if (source.startsWith(quoraBaseUrl)) return "quora";
  if (source.startsWith(linkedinBaseUrl)) return "linkedin";
  if (source.startsWith(facebookBaseUrl)) return "facebook";
  if (source.startsWith(mediumBaseUrl) || source.includes("medium.com"))
    return "medium";
  if (source.startsWith(blueskyBaseUrl)) return "bluesky";
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

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const normalizeUrl = (url: string): string => {
  try {
    let cleaned = url.trim();

    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = "https://" + cleaned;
    }

    const ytRegex = /^https?:\/\/youtu\.be\/([\w-]+)/;
    const ytMatch = ytRegex.exec(cleaned);
    if (ytMatch) {
      return `https://www.youtube.com/watch?v=${ytMatch[1]}`;
    }

    return cleaned;
  } catch {
    return url;
  }
};
