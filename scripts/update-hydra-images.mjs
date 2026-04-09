import { Client, Databases, Storage, ID, Query, InputFile } from "node-appwrite";
import path from "path";

const APPWRITE_URL = "https://cloud.appwrite.io/v1";
const PROJECT_ID = "65ed75e73895ca457661";
const API_KEY = "180dbb89de5bc712698e4124fd24f1ee6ae48bd954b31dc7aa59e357c9d403c2c6381dc04c45d12c0120b91cb22ed873d62cdb436833da1d0124f33061a0f0331a0ce6da1098c1a01c70367388832a3ae8f57fdc00b2f9e0d11787bae7928e473ba32c31451ebf682dbc7442706b80f60741cdf255e4bd5c835365dc263a84ec";
const DATABASE_ID = "65ed81d8651cfe000e96";
const PRODUCT_IMAGE_COLLECTION = "65ee9887134bc4c6b1ac";
const PRODUCT_COLLECTION = "65ed81e9258fd5b3a7b8";
const BUCKET_ID = "65eda0fc4b0db5feb54e";

const client = new Client();
client.setEndpoint(APPWRITE_URL).setProject(PROJECT_ID).setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

async function main() {
  // 1. Get the Hydra Lip Duo product
  const result = await databases.listDocuments(DATABASE_ID, PRODUCT_COLLECTION, [
    Query.equal("slug", "hydra-lip-duo"),
  ]);
  const product = result.documents[0];
  console.log(`Found: ${product.name} (${product.$id})`);
  console.log(`Current images: ${product.images?.length || 0}`);

  // 2. Delete old image docs and storage files
  if (product.images && product.images.length > 0) {
    for (const img of product.images) {
      const imgDoc = typeof img === "string" ? img : img.$id;
      const imgData = typeof img === "string"
        ? await databases.getDocument(DATABASE_ID, PRODUCT_IMAGE_COLLECTION, img)
        : img;

      console.log(`Deleting old image: ${imgData.image_id}...`);
      try {
        await storage.deleteFile(BUCKET_ID, imgData.image_id);
      } catch (e) {
        console.log(`  Storage delete failed (may not exist): ${e.message}`);
      }
      try {
        await databases.deleteDocument(DATABASE_ID, PRODUCT_IMAGE_COLLECTION, imgData.$id);
      } catch (e) {
        console.log(`  Doc delete failed: ${e.message}`);
      }
    }
  }

  // 3. Upload new images
  const newImages = [
    {
      path: "/Users/jobyer/Downloads/WhatsApp Image 2026-04-05 at 16.47.45.jpeg",
      alt: "Hydra Lip Duo Combo",
    },
    {
      path: "/Users/jobyer/Downloads/hydra-lip-gloss-resized.jpeg",
      alt: "Hydra Lip Duo Lip Gloss",
    },
  ];

  const newImageDocIds = [];
  for (const img of newImages) {
    console.log(`Uploading: ${path.basename(img.path)}...`);
    const file = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      InputFile.fromPath(img.path, path.basename(img.path))
    );
    const fileUrl = `${APPWRITE_URL}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
    const imageDoc = await databases.createDocument(
      DATABASE_ID,
      PRODUCT_IMAGE_COLLECTION,
      ID.unique(),
      { image_id: file.$id, image_url: fileUrl, alt: img.alt }
    );
    console.log(`  Uploaded: ${imageDoc.$id}`);
    newImageDocIds.push(imageDoc.$id);
  }

  // 4. Update product
  await databases.updateDocument(DATABASE_ID, PRODUCT_COLLECTION, product.$id, {
    images: newImageDocIds,
  });
  console.log(`\n✅ Hydra Lip Duo updated with ${newImageDocIds.length} images.`);
}

main().catch(console.error);
