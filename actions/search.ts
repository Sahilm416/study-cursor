"use server";

export const search = async (query: string) => {
  const result = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&q=${query}&part=snippet&type=video&maxResults=4`
  );
  const data = await result.json();
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
};
