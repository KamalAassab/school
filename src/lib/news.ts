import rawNewsData from "../../public/news/dataset_instagram-scraper_2026-09-05_14-29-31-103.json";
import localImagesData from "./news-local-images.json";
import thumbnailsData from "./news-thumbnails.json";

const localImages = localImagesData as Record<string, string>;
const thumbnails = thumbnailsData as Record<string, string>;

export interface RawNewsItem {
  alt?: string;
  caption: string;
  displayUrl: string;
  timestamp: string;
  url: string;
  type: "Image" | "Video" | "Sidecar";
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  fullCaption: string;
  displayUrl: string;
  fullImageUrl: string;
  timestamp: string;
  formattedDate: string;
  url: string;
  type: "Image" | "Video" | "Sidecar";
  isArabic: boolean;
  tags: string[];
}

function isArabicText(text: string): boolean {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  const words = text.split(/\s+/).slice(0, 10).join(" ");
  return arabicRegex.test(words);
}

function formatFrenchDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

function parsePostContent(caption: string) {
  const lines = caption.split("\n").map((l) => l.trim()).filter(Boolean);
  const rawFirstLine = lines[0] || "Actualité de School Academy";
  
  // Clean markdown bold syntax like **text**
  const cleanFirstLine = rawFirstLine
    .replace(/\*\*/g, "")
    .replace(/^[#\s]+/, "")
    .trim();

  // Extract hashtags
  const hashtags = (caption.match(/#[a-zA-Z0-9_\u0600-\u06FF]+/g) || []).map((t) => t.trim());

  // Build remaining description without hashtag dump lines
  const otherLines = lines.slice(1).filter((l) => !l.startsWith("#"));
  const description = otherLines.join(" ").replace(/\*\*/g, "").trim();

  const title = cleanFirstLine.length > 90 ? cleanFirstLine.slice(0, 87) + "…" : cleanFirstLine;
  const finalDesc = description || cleanFirstLine;

  return {
    title,
    description: finalDesc,
    tags: hashtags.slice(0, 4),
    isArabic: isArabicText(title),
  };
}

// Process and sort chronologically (newest first, only Images)
export const allNews: NewsItem[] = (rawNewsData as RawNewsItem[])
  .filter((item) => item && item.displayUrl && item.caption && item.type === "Image")
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  .map((item, index) => {
    const parsed = parsePostContent(item.caption);
    const localFull = localImages[item.url] || item.displayUrl;
    const localThumb = thumbnails[item.url] || localFull;
    return {
      id: `news-${index}-${item.timestamp}`,
      title: parsed.title,
      description: parsed.description,
      fullCaption: item.caption,
      displayUrl: localThumb,
      fullImageUrl: localFull,
      timestamp: item.timestamp,
      formattedDate: formatFrenchDate(item.timestamp),
      url: item.url,
      type: item.type,
      isArabic: parsed.isArabic,
      tags: parsed.tags,
    };
  });
