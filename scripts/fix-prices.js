const { Client, Databases, Query } = require("node-appwrite");

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65ed75e73895ca457661")
  .setKey(
    "180dbb89de5bc712698e4124fd24f1ee6ae48bd954b31dc7aa59e357c9d403c2c6381dc04c45d12c0120b91cb22ed873d62cdb436833da1d0124f33061a0f0331a0ce6da1098c1a01c70367388832a3ae8f57fdc00b2f9e0d11787bae7928e473ba32c31451ebf682dbc7442706b80f60741cdf255e4bd5c835365dc263a84ec"
  );

const db = new Databases(client);
const DB = "65ed81d8651cfe000e96";
const PROD = "65ed81e9258fd5b3a7b8";

// Original sale prices (the prices customers should see)
const originalSalePrices = {
  "66081d18a72dd0740055": 903,   // Bondi Kiss Liquid Matte
  "6608206fb305e82ee4d6": 903,   // Murray Nude Liquid Matte
  "660823e2a9580df8b20b": 903,   // Valentine Cresent Liquid Matte
  "660826901a1aebcb39bc": 903,   // Crimson love Liquid Matte
  "660829eca5edaee0cc89": 903,   // Devoted Lois Liquid Matte
  "66082db403486ec80b22": 903,   // Scarlet Red Liquid Matte
  "660836c6f0a36da85d9e": 903,   // Sunshine Berry Liquid Matte
  "6608462cdbb3d4bbb54d": 903,   // Byron Rose Liquid Matte
  "6608ab97c7a2caa14da6": 903,   // Opera love Liquid Matte
  "6608ae2c0d59121354a3": 903,   // Mauve Moment Liquid Matte
  "6608b0e492bd999ca677": 903,   // Nude Heaven Liquid Matte
  "6608b3ae9b2cd1271578": 903,   // Coral Harbour Liquid Matte
  "6608fd782449e2d82be2": 941,   // Ruby Dance Bullet Semi Matte
  "66090035745143268a80": 941,   // Nude Blush Bullet Matte
  "6609024345a8f1218cc8": 941,   // Cherry Kiss Bullet Semi-Matte
  "6609040f06389d69a75f": 941,   // Sexy Coral Bullet Semi-Matte
  "660906177ffa1cc98562": 941,   // Nude classic Bullet Matte
  "660907cbbc18ef186530": 941,   // Precious Love Bullet Semi Matte
  "660919645d55ecefee82": 941,   // Mellow Nude Bullet Matte
  "66091b422ebb57e67256": 941,   // Victoria Rose Bullet Semi Matte
  "66091d1412b4362d91db": 941,   // Blushing Chloe Bullet Matte
  "6609219b4f9f528346d9": 4000,  // UV Waterful Cushion Foundation SPF 50
  "6609242905c07b4313df": 2850,  // Cushion Foundation Shade 1.5
  "66092620ce4ec1fe55b1": 2850,  // Cushion Foundation Shade 3.0
  "660929eb6f5e3cc42e4a": 1425,  // Concealer Shade 1.5
  "66092bd0d811bde9b0d1": 1425,  // Concealer Shade 3.0
  "66092ea953c9650c164c": 2375,  // D'L Bloom Palette (Blush)
  "660931752e02bf93cf0b": 4323,  // D'L Signature Palette
  "66093353b2f6b8fc19a5": 2375,  // D'L Glow Face Palette
  "660935a1b5e23e61be9b": 1188,  // Translucent Setting Powder
  "66093869363da02de718": 1425,  // Sunscreen Cream
  "66093c0b4440849722fb": 3325,  // Monica Revitalize
  "66093fc505cd2ff14361": 903,   // Gel Eyeliner Brown
  "6609442884933e6e60c0": 903,   // Gel Eyeliner Black
  "660946a0a8b365fd47ee": 950,   // Perfect Lash Mascara
  "66098196424da5dcf0b8": 4750,  // Signature Brush Set
  "66110b62534c53ca959f": 941,   // French Love Matte
  "6611198e1ab15098c1c7": 941,   // Sizzling Brown Matte
  "66112320c3ea5b1014ba": 941,   // Crimson 1.5 Semi-Matte
  "67d0034a328829fa75ca": 941,   // Lois Tangerine Bullet Matte
  "68d91c31818d6aa32817": 1140,  // Rouge Chloé Lip Oil
};

async function fixPrices() {
  const products = await db.listDocuments(DB, PROD, [Query.limit(100)]);

  let updated = 0;
  for (const p of products.documents) {
    const salePrice = originalSalePrices[p.$id];
    if (salePrice && (p.price !== salePrice || p.sale_price !== salePrice)) {
      await db.updateDocument(DB, PROD, p.$id, {
        price: salePrice,
        sale_price: salePrice,
      });
      console.log(`${p.name}: ${p.price}/${p.sale_price} → ${salePrice}/${salePrice}`);
      updated++;
      await new Promise((r) => setTimeout(r, 200));
    } else if (!salePrice) {
      // For products not in our map, just make price = sale_price (already equal)
      console.log(`${p.name}: ${p.price}/${p.sale_price} — skipped (not in map)`);
    } else {
      console.log(`${p.name}: already correct at ${salePrice}`);
    }
  }

  console.log(`\nDone! Updated ${updated} products.`);
}

fixPrices();
