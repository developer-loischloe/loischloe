import { Client, Databases, Storage, Query } from "node-appwrite";

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
  // The 2nd image doc ID from previous upload
  const secondImageDocId = "69d242ab4fc8d4f7cf83";

  // Get the image doc to find the storage file ID
  const imgDoc = await databases.getDocument(DATABASE_ID, PRODUCT_IMAGE_COLLECTION, secondImageDocId);
  console.log(`Deleting image: ${imgDoc.alt} (file: ${imgDoc.image_id})`);

  // Delete storage file
  await storage.deleteFile(BUCKET_ID, imgDoc.image_id);
  // Delete image document
  await databases.deleteDocument(DATABASE_ID, PRODUCT_IMAGE_COLLECTION, secondImageDocId);

  // Update product to only keep the first image
  const firstImageDocId = "69d242aa4ed78aa9ea78";
  const result = await databases.listDocuments(DATABASE_ID, PRODUCT_COLLECTION, [
    Query.equal("slug", "hydra-lip-duo"),
  ]);
  await databases.updateDocument(DATABASE_ID, PRODUCT_COLLECTION, result.documents[0].$id, {
    images: [firstImageDocId],
  });

  console.log("✅ 2nd image removed. Hydra Lip Duo now has 1 image.");
}

main().catch(console.error);
