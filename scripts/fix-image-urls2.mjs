import { Client, Databases, Query } from "node-appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65ed75e73895ca457661")
  .setKey("180dbb89de5bc712698e4124fd24f1ee6ae48bd954b31dc7aa59e357c9d403c2c6381dc04c45d12c0120b91cb22ed873d62cdb436833da1d0124f33061a0f0331a0ce6da1098c1a01c70367388832a3ae8f57fdc00b2f9e0d11787bae7928e473ba32c31451ebf682dbc7442706b80f60741cdf255e4bd5c835365dc263a84ec");

const db = new Databases(client);
const DB_ID = "65ed81d8651cfe000e96";
const PRODUCT_COL = "65ed81e9258fd5b3a7b8";
const IMAGE_COL = "65ee9887134bc4c6b1ac";

async function main() {
  const slugs = ["glam-on-the-go", "hydra-lip-duo"];

  for (const slug of slugs) {
    const result = await db.listDocuments(DB_ID, PRODUCT_COL, [Query.equal("slug", slug)]);
    const product = result.documents[0];
    console.log(`${slug} - ${product.images?.length || 0} images`);

    for (const img of product.images || []) {
      const currentUrl = img.image_url;
      if (currentUrl.includes("&mode=admin")) {
        const newUrl = currentUrl.replace("&mode=admin", "");
        console.log(`  Fixing: ${img.$id}`);
        console.log(`  Old: ${currentUrl}`);
        console.log(`  New: ${newUrl}`);
        await db.updateDocument(DB_ID, IMAGE_COL, img.$id, { image_url: newUrl });
        console.log(`  Done!`);
      } else {
        console.log(`  OK: ${img.$id}`);
      }
    }
  }
  console.log("\nAll URLs fixed — removed &mode=admin!");
}

main().catch(console.error);
