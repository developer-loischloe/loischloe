import { Client, Databases, Storage, ID, Query, InputFile } from "node-appwrite";
import path from "path";

// Config
const APPWRITE_URL = "https://cloud.appwrite.io/v1";
const PROJECT_ID = "65ed75e73895ca457661";
const API_KEY = "180dbb89de5bc712698e4124fd24f1ee6ae48bd954b31dc7aa59e357c9d403c2c6381dc04c45d12c0120b91cb22ed873d62cdb436833da1d0124f33061a0f0331a0ce6da1098c1a01c70367388832a3ae8f57fdc00b2f9e0d11787bae7928e473ba32c31451ebf682dbc7442706b80f60741cdf255e4bd5c835365dc263a84ec";
const DATABASE_ID = "65ed81d8651cfe000e96";
const PRODUCT_IMAGE_COLLECTION = "65ee9887134bc4c6b1ac";
const PRODUCT_COLLECTION = "65ed81e9258fd5b3a7b8";
const BUCKET_ID = "65eda0fc4b0db5feb54e";

// Init client
const client = new Client();
client.setEndpoint(APPWRITE_URL).setProject(PROJECT_ID).setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

async function uploadImage(filePath, altText) {
  console.log(`Uploading: ${path.basename(filePath)}...`);

  // Step 1: Upload file to storage bucket
  const file = await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    InputFile.fromPath(filePath, path.basename(filePath))
  );
  console.log(`  File uploaded: ${file.$id}`);

  // Step 2: Get file view URL
  const fileUrl = `${APPWRITE_URL}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;

  // Step 3: Create product_image document
  const imageDoc = await databases.createDocument(
    DATABASE_ID,
    PRODUCT_IMAGE_COLLECTION,
    ID.unique(),
    {
      image_id: file.$id,
      image_url: fileUrl,
      alt: altText,
    }
  );
  console.log(`  Image doc created: ${imageDoc.$id}`);

  return imageDoc.$id;
}

async function findProduct(slug) {
  const result = await databases.listDocuments(DATABASE_ID, PRODUCT_COLLECTION, [
    Query.equal("slug", slug),
  ]);
  if (result.documents.length === 0) {
    throw new Error(`Product not found: ${slug}`);
  }
  return result.documents[0];
}

async function updateProductImages(productId, imageDocIds) {
  console.log(`Updating product ${productId} with ${imageDocIds.length} images...`);
  await databases.updateDocument(DATABASE_ID, PRODUCT_COLLECTION, productId, {
    images: imageDocIds,
  });
  console.log("  Product updated!");
}

async function main() {
  const downloadsDir = "/Users/jobyer/Downloads";

  // ===== GLAM ON THE GO =====
  console.log("\n=== GLAM ON THE GO ===\n");

  const glamImages = [
    { path: `${downloadsDir}/WhatsApp Image 2026-04-05 at 16.15.27.jpeg`, alt: "Glam On The Go Combo" },
    { path: `${downloadsDir}/2nd.webp`, alt: "Glam On The Go Cushion Foundation" },
    { path: `${downloadsDir}/3rd.webp`, alt: "Glam On The Go Mascara Chloe" },
    { path: `${downloadsDir}/4th.webp`, alt: "Glam On The Go Lipstick" },
  ];

  const glamImageDocIds = [];
  for (const img of glamImages) {
    const docId = await uploadImage(img.path, img.alt);
    glamImageDocIds.push(docId);
  }

  const glamProduct = await findProduct("glam-on-the-go");
  console.log(`Found product: ${glamProduct.name} (${glamProduct.$id})`);
  await updateProductImages(glamProduct.$id, glamImageDocIds);

  // ===== HYDRA LIP DUO =====
  console.log("\n=== HYDRA LIP DUO ===\n");

  const hydraImages = [
    { path: `${downloadsDir}/WhatsApp Image 2026-04-05 at 16.47.45.jpeg`, alt: "Hydra Lip Duo Combo" },
    { path: `${downloadsDir}/WhatsApp Image 2026-04-05 at 14.33.46.jpeg`, alt: "Hydra Lip Duo Collection" },
  ];

  const hydraImageDocIds = [];
  for (const img of hydraImages) {
    const docId = await uploadImage(img.path, img.alt);
    hydraImageDocIds.push(docId);
  }

  const hydraProduct = await findProduct("hydra-lip-duo");
  console.log(`Found product: ${hydraProduct.name} (${hydraProduct.$id})`);
  await updateProductImages(hydraProduct.$id, hydraImageDocIds);

  console.log("\n✅ All done! Both products updated with images.\n");
}

main().catch(console.error);
