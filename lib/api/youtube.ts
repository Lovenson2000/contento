const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

export async function fetchYoutubeVideoDetails(videoId: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error(
      "Error fetching YouTube video details:",
      res.status,
      res.statusText
    );
    throw new Error("Failed to fetch YouTube video details");
  }

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("No video details found for the provided ID");
  }

  return data.items[0];
}
