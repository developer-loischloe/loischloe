const { Client, Databases } = require("node-appwrite");

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65ed75e73895ca457661")
  .setKey(
    "180dbb89de5bc712698e4124fd24f1ee6ae48bd954b31dc7aa59e357c9d403c2c6381dc04c45d12c0120b91cb22ed873d62cdb436833da1d0124f33061a0f0331a0ce6da1098c1a01c70367388832a3ae8f57fdc00b2f9e0d11787bae7928e473ba32c31451ebf682dbc7442706b80f60741cdf255e4bd5c835365dc263a84ec"
  );

const db = new Databases(client);
const DATABASE_ID = "65ed81d8651cfe000e96";
const PRODUCT_COLLECTION = "65ed81e9258fd5b3a7b8";
const REVIEW_COLLECTION = "65eda8dc0ad5cd0837e5";

// Random review count per product (7–15) for realism
function getRandomCount() {
  return Math.floor(Math.random() * 9) + 7; // 7 to 15
}

const productIds = [
  "66081d18a72dd0740055", "6608206fb305e82ee4d6", "660823e2a9580df8b20b",
  "660826901a1aebcb39bc", "660829eca5edaee0cc89", "66082db403486ec80b22",
  "660836c6f0a36da85d9e", "6608462cdbb3d4bbb54d", "6608ab97c7a2caa14da6",
  "6608ae2c0d59121354a3", "6608b0e492bd999ca677", "6608b3ae9b2cd1271578",
  "6608fd782449e2d82be2", "66090035745143268a80", "6609024345a8f1218cc8",
  "6609040f06389d69a75f", "660906177ffa1cc98562", "660907cbbc18ef186530",
  "660919645d55ecefee82", "66091b422ebb57e67256", "66091d1412b4362d91db",
  "6609219b4f9f528346d9", "6609242905c07b4313df", "66092620ce4ec1fe55b1",
  "660929eb6f5e3cc42e4a", "66092bd0d811bde9b0d1", "66092ea953c9650c164c",
  "660931752e02bf93cf0b", "66093353b2f6b8fc19a5", "660935a1b5e23e61be9b",
  "66093869363da02de718", "66093c0b4440849722fb", "66093fc505cd2ff14361",
  "6609442884933e6e60c0", "660946a0a8b365fd47ee", "66098196424da5dcf0b8",
  "66110b62534c53ca959f", "6611198e1ab15098c1c7", "66112320c3ea5b1014ba",
  "673451b877479e2c2cb5", "67d0034a328829fa75ca", "68d91c31818d6aa32817",
];

async function trimReviews() {
  console.log(`Trimming reviews for ${productIds.length} products to random counts (7–15 each).\n`);

  let totalKept = 0;
  let totalDeleted = 0;

  for (const id of productIds) {
    try {
      const product = await db.getDocument(DATABASE_ID, PRODUCT_COLLECTION, id);
      const allReviews = product.reviews || [];

      const targetCount = getRandomCount();

      if (allReviews.length <= targetCount) {
        console.log(`${product.name}: ${allReviews.length} reviews (target ${targetCount}) — OK`);
        totalKept += allReviews.length;
        continue;
      }

      // Shuffle then pick targetCount to keep (random selection, not just top-rated)
      const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
      const toKeep = shuffled.slice(0, targetCount);
      const toDelete = shuffled.slice(targetCount);

      const keepIds = toKeep.map((r) => r.$id);
      const deleteIds = toDelete.map((r) => r.$id);
      const avgRating = toKeep.reduce((acc, r) => acc + r.rating, 0) / toKeep.length;

      // Delete excess review documents first
      for (const delId of deleteIds) {
        try {
          await db.deleteDocument(DATABASE_ID, REVIEW_COLLECTION, delId);
        } catch (e) {
          // Skip if already deleted
        }
      }

      // Now update the product - the deleted reviews should be auto-removed from relationship
      // Just update avg_rating since relationship is auto-cleaned
      await db.updateDocument(DATABASE_ID, PRODUCT_COLLECTION, id, {
        avg_rating: avgRating,
      });

      totalKept += targetCount;
      totalDeleted += deleteIds.length;

      console.log(
        `${product.name}: ${allReviews.length} → ${targetCount}, deleted ${deleteIds.length}, avg: ${avgRating.toFixed(2)} ✓`
      );
    } catch (err) {
      console.error(`ID ${id}: Failed — ${err.message}`);
    }

    await new Promise((r) => setTimeout(r, 250));
  }

  console.log(`\n=== Done! Kept: ~${totalKept}, Deleted: ${totalDeleted} ===`);
}

trimReviews();
