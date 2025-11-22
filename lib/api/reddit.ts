export async function fetchRedditTitle(url: string): Promise<string | null> {
  try {
    const cleanUrl = url.split("?")[0].replace(/\/$/, "");
    const jsonUrl = `${cleanUrl}.json`;

    const response = await fetch(jsonUrl, {
      headers: {
        "User-Agent": "ContentoApp/1.0",
      },
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok || !contentType?.includes("application/json")) {
      return null;
    }

    const json = await response.json();

    const title =
      json?.[0]?.data?.children?.[0]?.data?.title ??
      json?.data?.children?.[0]?.data?.title ??
      null;

    return title;
  } catch {
    return null;
  }
}
