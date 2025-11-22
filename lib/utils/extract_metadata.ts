import { fetchRedditTitle } from "../api/reddit";
import { fetchYoutubeVideoDetails } from "../api/youtube";
import { extractYoutubeIdFromUrl } from "./content";

export async function extractMetadata(url: string) {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
    const id = extractYoutubeIdFromUrl(url);
    if (id) {
      const data = await fetchYoutubeVideoDetails(id);
      return {
        title: data.snippet?.title ?? "",
        image: data.snippet?.thumbnails?.high?.url ?? "",
        source: "youtube",
      };
    }
  }

  // ----- REDDIT -----
  if (lowerUrl.includes("reddit.com")) {
    const title = await fetchRedditTitle(url);
    return { title: title ?? "", source: "reddit" };
  }
  return { title: "", source: "unknown" };
}
