"use server";

export interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

// Curated fallback posts — update these with your latest Instagram content
const FALLBACK_POSTS: InstagramPost[] = [
  {
    id: "fallback-1",
    caption: "Your daily dose of glam 💋 #LOISCHLOE #VeganMakeup",
    media_url:
      "https://cloud.appwrite.io/v1/storage/buckets/65eda0fc4b0db5feb54e/files/68d91c10d6172da4d1e1/view?project=65ed75e73895ca457661",
    permalink: "https://www.instagram.com/loischloe_bangladesh/",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    caption: "Cruelty-free beauty that speaks volumes ✨ #CrueltyFree",
    media_url:
      "https://cloud.appwrite.io/v1/storage/buckets/65eda0fc4b0db5feb54e/files/68d91c11572d6f0075fc/view?project=65ed75e73895ca457661",
    permalink: "https://www.instagram.com/loischloe_bangladesh/",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    caption: "Made in Australia, loved in Bangladesh 🇦🇺🇧🇩",
    media_url:
      "https://cloud.appwrite.io/v1/storage/buckets/65eda0fc4b0db5feb54e/files/68d91c10d6172da4d1e1/view?project=65ed75e73895ca457661",
    permalink: "https://www.instagram.com/loischloe_bangladesh/",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fallback-4",
    caption: "Your skin deserves the best 🌿 #VeganBeauty",
    media_url:
      "https://cloud.appwrite.io/v1/storage/buckets/65eda0fc4b0db5feb54e/files/68d91c11572d6f0075fc/view?project=65ed75e73895ca457661",
    permalink: "https://www.instagram.com/loischloe_bangladesh/",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fallback-5",
    caption: "Glam up your everyday look 💄 #LOISCHLOE",
    media_url:
      "https://cloud.appwrite.io/v1/storage/buckets/65eda0fc4b0db5feb54e/files/68d91c10d6172da4d1e1/view?project=65ed75e73895ca457661",
    permalink: "https://www.instagram.com/loischloe_bangladesh/",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fallback-6",
    caption: "Beauty without compromise 🌸 #BSTIApproved",
    media_url:
      "https://cloud.appwrite.io/v1/storage/buckets/65eda0fc4b0db5feb54e/files/68d91c11572d6f0075fc/view?project=65ed75e73895ca457661",
    permalink: "https://www.instagram.com/loischloe_bangladesh/",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
];

/**
 * Fetches Instagram posts via the Graph API.
 * Requires INSTAGRAM_ACCESS_TOKEN env var.
 *
 * To get a token:
 * 1. Create a Facebook App at developers.facebook.com
 * 2. Add "Instagram Basic Display" or "Instagram Graph API" product
 * 3. Generate a long-lived token (valid 60 days, auto-refreshable)
 * 4. Add to Vercel env vars as INSTAGRAM_ACCESS_TOKEN
 */
export async function fetchInstagramPosts(
  limit: number = 6
): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return FALLBACK_POSTS.slice(0, limit);
  }

  try {
    const fields = "id,caption,media_url,thumbnail_url,permalink,media_type,timestamp";
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) {
      console.warn("Instagram API error:", res.status, await res.text());
      return FALLBACK_POSTS.slice(0, limit);
    }

    const data = await res.json();
    return data.data as InstagramPost[];
  } catch (error) {
    console.warn("Failed to fetch Instagram posts:", error);
    return FALLBACK_POSTS.slice(0, limit);
  }
}
