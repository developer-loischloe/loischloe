import { NextResponse } from "next/server";
import appwriteProductService from "@/appwrite/appwriteProductService";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // 1 hour

const SITE_URL = "https://loischloe.com.bd";

function escapeXml(unsafe: string = ""): string {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(html: string = ""): string {
  return String(html).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export async function GET() {
  try {
    const response = await appwriteProductService.getProductList({
      p_category: "",
      c_category: "",
      n_category: "",
      keyword: "",
      page: 1,
      resultPerPage: 200,
    } as any);

    const products = response?.documents || [];

    const items = products
      .map((p: any) => {
        const id = p.$id;
        const title = escapeXml(p.name || "");
        const description = escapeXml(
          stripHtml(p.short_description || p.description || p.name || "")
        ).slice(0, 5000);
        const link = `${SITE_URL}/products/${p.slug}`;
        const imageLink = escapeXml(p.images?.[0]?.image_url || "");
        const availability =
          p.stock === "in-stock" ? "in stock" : "out of stock";
        const price = `${p.sale_price || p.price || 0} BDT`;
        const brand = "LOIS CHLOE";

        return `
    <item>
      <g:id>${escapeXml(id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:price>${price}</g:price>
      <g:brand>${brand}</g:brand>
      <g:google_product_category>Health &amp; Beauty &gt; Personal Care &gt; Cosmetics</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>LOIS CHLOE Product Feed</title>
    <link>${SITE_URL}</link>
    <description>Vegan cosmetics from Bangladesh</description>${items}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Product feed error:", error);
    return new NextResponse("Failed to generate feed", { status: 500 });
  }
}
