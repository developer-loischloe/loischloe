const { Client, Databases, ID } = require("node-appwrite");

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

const firstNames = [
  "Fatima", "Ayesha", "Nusrat", "Tasneem", "Sabrina", "Lamia", "Raisa",
  "Nadia", "Fariha", "Maliha", "Tasnim", "Sadia", "Afsana", "Rimi",
  "Mehjabin", "Jannatul", "Sharmin", "Nafisa", "Tanjina", "Sumaiya",
  "Israt", "Mithila", "Nusaiba", "Rubaiya", "Tahmina", "Lubna", "Samia",
  "Fahmida", "Naima", "Rashida", "Bushra", "Tahsin", "Mahfuza", "Sharmeen",
  "Tanisha", "Priya", "Meher", "Sanjida", "Kaniz", "Umma", "Tania",
  "Habiba", "Laboni", "Mousumi", "Ritika", "Ankita", "Nishat", "Zubaida",
  "Hasina", "Rumana", "Farjana", "Shamima", "Sultana", "Shirin", "Moushumi",
];
const lastInitials = ["A.", "B.", "C.", "D.", "F.", "H.", "I.", "J.", "K.", "L.", "M.", "N.", "P.", "R.", "S.", "T.", "U.", "Z."];

const reviewTexts = [
  "The color payoff is incredible! Stays on through meals and doesn't dry out my lips at all.",
  "This shade is absolutely gorgeous on my skin tone. I've gotten so many compliments!",
  "Smooth application, no tugging. The matte finish is perfect without being too drying.",
  "I wore this to my cousin's wedding and it lasted the entire event. Amazing staying power!",
  "The pigmentation is so rich — one swipe gives full coverage. Love it!",
  "Finally found a product that doesn't disappoint. This is a keeper!",
  "Such a beautiful product! Goes on creamy and sets to a perfect finish.",
  "I'm obsessed with this. It's my everyday go-to now. So easy to use!",
  "Bought this for Eid and got so many compliments. Absolutely stunning!",
  "Very comfortable to wear all day. No issues even after 6+ hours.",
  "The formula is so lightweight, I forget I'm wearing it. Perfect for daily use!",
  "Looks even better in person than in the photos. Truly luxurious feel.",
  "Applied it in the morning and it was still intact after lunch. Impressive longevity!",
  "Love that it's vegan and cruelty-free. Quality rivals high-end international brands.",
  "My skin feels so soft even after removing it. The formula is really nourishing.",
  "The packaging is beautiful and the product itself is even better. Worth every taka!",
  "Gifted this to my sister and she loved it so much, she ordered two more!",
  "No issues at all. Clean, crisp application every time.",
  "Perfect for Bangladeshi skin tones. Finally a brand that gets us!",
  "My go-to for both casual outings and formal events. So versatile!",
  "Lightweight yet long-lasting. I don't need to reapply throughout the day anymore.",
  "My friends keep asking what I'm using. This product is a showstopper!",
  "As a makeup enthusiast, I recommend this to everyone. The quality is top-notch.",
  "Perfect consistency — not too thick, not too thin. Glides on effortlessly.",
  "Bought it on a friend's recommendation and I'm so glad I did. Best purchase!",
  "The best product available in Bangladesh hands down. Will definitely repurchase.",
  "Wore this to my office and my colleagues couldn't stop asking about it!",
  "I've replaced all my other products with Lois Chloe. Nothing compares!",
  "The best thing I've bought for myself this year. Absolutely worth the price!",
  "Excellent product! The quality is outstanding and it exceeded my expectations.",
  "I'm so impressed with this product. Will definitely be ordering again!",
  "Arrived quickly and the packaging was beautiful. Product itself is top quality!",
  "Love supporting a Bangladeshi brand that delivers international-level quality!",
  "My favorite product from Lois Chloe. The formula is simply amazing!",
  "The best beauty product I've purchased this year. Worth every taka!",
  "Such a well-made product. You can tell the quality from the moment you open it!",
  "Finally found a product that actually delivers on its promises. Highly recommend!",
  "My daily essential now. Can't imagine my routine without this product!",
  "I keep coming back to this product. Nothing else compares in its category!",
  "My whole beauty routine is Lois Chloe now. Consistent quality across all products!",
];

function generateRating() {
  return Math.random() < 0.82 ? 5 : 4;
}

// Pre-assign random targets (7–15) for all 42 products ensuring total <= 460
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

// Fixed targets to ensure variety — hand-picked to look natural
const targets = [
  12, 8, 14, 9, 11, 13, 7, 15, 10, 8,
  14, 11, 9, 13, 7, 12, 15, 8, 10, 14,
  9, 11, 7, 13, 12, 8, 15, 10, 14, 9,
  11, 7, 13, 8, 12, 15, 10, 9, 14, 11,
  8, 13,
];

async function randomizeReviews() {
  const totalTarget = targets.reduce((a, b) => a + b, 0);
  console.log(`Randomizing reviews for ${productIds.length} products. Total target: ${totalTarget}\n`);

  let totalKept = 0;
  let totalAdded = 0;
  let totalDeleted = 0;

  for (let i = 0; i < productIds.length; i++) {
    const id = productIds[i];
    const target = targets[i];

    try {
      const product = await db.getDocument(DATABASE_ID, PRODUCT_COLLECTION, id);
      const currentReviews = product.reviews || [];
      const current = currentReviews.length;

      if (current === target) {
        const avg = currentReviews.reduce((a, r) => a + r.rating, 0) / current;
        console.log(`${product.name}: ${current} = ${target} — already correct (avg ${avg.toFixed(2)})`);
        totalKept += current;
        continue;
      }

      if (current > target) {
        // Delete excess reviews
        const shuffled = [...currentReviews].sort(() => Math.random() - 0.5);
        const toDelete = shuffled.slice(target);

        for (const rev of toDelete) {
          try {
            await db.deleteDocument(DATABASE_ID, REVIEW_COLLECTION, rev.$id);
          } catch (e) { /* skip */ }
        }

        const kept = shuffled.slice(0, target);
        const avg = kept.reduce((a, r) => a + r.rating, 0) / kept.length;
        await db.updateDocument(DATABASE_ID, PRODUCT_COLLECTION, id, { avg_rating: avg });

        totalKept += target;
        totalDeleted += toDelete.length;
        console.log(`${product.name}: ${current} → ${target} (deleted ${toDelete.length}, avg ${avg.toFixed(2)}) ✓`);
      } else {
        // Add more reviews
        const toAdd = target - current;
        const usedComments = new Set(currentReviews.map(r => r.comment));
        const usedNames = new Set(currentReviews.map(r => r.name));

        for (let j = 0; j < toAdd; j++) {
          let comment;
          let attempts = 0;
          do {
            comment = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
            attempts++;
          } while (usedComments.has(comment) && attempts < 50);
          usedComments.add(comment);

          let name;
          attempts = 0;
          do {
            const first = firstNames[Math.floor(Math.random() * firstNames.length)];
            const last = lastInitials[Math.floor(Math.random() * lastInitials.length)];
            name = `${first} ${last}`;
            attempts++;
          } while (usedNames.has(name) && attempts < 50);
          usedNames.add(name);

          await db.createDocument(DATABASE_ID, REVIEW_COLLECTION, ID.unique(), {
            name,
            rating: generateRating(),
            comment,
            email: null,
            images: [],
            "65ed81e9258fd5b3a7b8": id,
            approved: true,
          });
        }

        // Recalculate avg
        const updated = await db.getDocument(DATABASE_ID, PRODUCT_COLLECTION, id);
        const allRevs = updated.reviews || [];
        const avg = allRevs.reduce((a, r) => a + r.rating, 0) / allRevs.length;
        await db.updateDocument(DATABASE_ID, PRODUCT_COLLECTION, id, { avg_rating: avg });

        totalKept += target;
        totalAdded += toAdd;
        console.log(`${product.name}: ${current} → ${target} (added ${toAdd}, avg ${avg.toFixed(2)}) ✓`);
      }
    } catch (err) {
      console.error(`ID ${id}: Failed — ${err.message}`);
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n=== Done! Total: ${totalKept}, Added: ${totalAdded}, Deleted: ${totalDeleted} ===`);
}

randomizeReviews();
