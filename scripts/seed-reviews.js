const { Client, Databases, Query, ID } = require("node-appwrite");

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

// Bangladeshi names pool
const firstNames = [
  "Fatima", "Ayesha", "Nusrat", "Tasneem", "Sabrina", "Lamia", "Raisa",
  "Nadia", "Fariha", "Maliha", "Tasnim", "Sadia", "Afsana", "Rimi",
  "Mehjabin", "Jannatul", "Sharmin", "Nafisa", "Tanjina", "Sumaiya",
  "Israt", "Mithila", "Nusaiba", "Rubaiya", "Tahmina", "Lubna", "Samia",
  "Fahmida", "Naima", "Rashida", "Bushra", "Tahsin", "Mahfuza", "Sharmeen",
  "Tanisha", "Priya", "Meher", "Sanjida", "Kaniz", "Umma", "Tania",
  "Habiba", "Laboni", "Mousumi", "Ritika", "Ankita", "Nishat", "Zubaida",
  "Hasina", "Rumana", "Farjana", "Shamima", "Sultana", "Shirin", "Moushumi",
  "Tamanna", "Farzana", "Masuda", "Rehana", "Nasreen",
];

const lastInitials = [
  "A.", "B.", "C.", "D.", "F.", "H.", "I.", "J.", "K.", "L.",
  "M.", "N.", "P.", "R.", "S.", "T.", "U.", "Z.",
];

// Product-type specific review templates
const lipstickReviews = [
  "The color payoff is incredible! Stays on through meals and doesn't dry out my lips at all.",
  "This shade is absolutely gorgeous on my skin tone. I've gotten so many compliments!",
  "Smooth application, no tugging. The matte finish is perfect without being too drying.",
  "I wore this to my cousin's wedding and it lasted the entire event. Amazing staying power!",
  "The pigmentation is so rich — one swipe gives full coverage. Love it!",
  "Finally found a lipstick that doesn't transfer to my coffee cup. This is a keeper!",
  "Such a beautiful shade! It goes on creamy and sets to a perfect matte finish.",
  "I'm obsessed with this color. It's my everyday go-to now. So easy to apply!",
  "Bought this for Eid and got so many compliments. The shade is absolutely stunning!",
  "Very comfortable to wear all day. No cracking or flaking even after 6+ hours.",
  "The formula is so lightweight, I forget I'm wearing lipstick. Perfect for daily use!",
  "This shade looks even better in person than in the photos. Truly luxurious feel.",
  "Applied it in the morning and it was still intact after lunch. Impressive longevity!",
  "Love that it's vegan and cruelty-free. The quality rivals high-end international brands.",
  "My lips feel so soft even after removing it. The formula is really nourishing.",
  "The packaging is beautiful and the lipstick itself is even better. Worth every taka!",
  "I've tried many lipsticks but this one has the best color-to-comfort ratio ever.",
  "Gifted this to my sister and she loved it so much, she ordered two more shades!",
  "No feathering around the lip line at all. Clean, crisp application every time.",
  "The shade range is perfect for Bangladeshi skin tones. Finally a brand that gets us!",
  "Buttery smooth application. This is by far the best matte lipstick I've tried locally.",
  "Survived a whole day of eating biriyani and drinking chai. What more can I ask for?",
  "My go-to for both casual outings and formal events. So versatile!",
  "The vegan formula doesn't compromise on quality at all. Really impressed!",
  "Lightweight yet long-lasting. I don't need to reapply throughout the day anymore.",
  "Beautiful color that complements my outfit every time. I own 4 shades now!",
  "The matte finish doesn't make my lips look dry. It's the perfect balance.",
  "Ordered online and the delivery was fast. The product exceeded my expectations!",
  "My friends keep asking what lipstick I'm wearing. This shade is a showstopper!",
  "I love how it doesn't bleed or smudge. Perfect for wearing under masks too.",
  "The formula has improved my lip care routine. My lips feel healthier than before!",
  "Absolutely gorgeous shade — it photographs beautifully too. Love it for selfies!",
  "As a makeup artist, I recommend this to all my clients. The quality is top-notch.",
  "This lipstick made me fall in love with bold lips again. So comfortable!",
  "Perfect consistency — not too thick, not too thin. Glides on effortlessly.",
  "The color stays true throughout the day without fading or changing shade.",
  "Bought it on a friend's recommendation and I'm so glad I did. Best purchase!",
  "I love that it's made with safe ingredients. Finally a lipstick I can trust!",
  "This shade is universally flattering. Looks amazing on all my friends too!",
  "The best lipstick available in Bangladesh hands down. Will definitely repurchase.",
  "Wore this to my office and my colleagues couldn't stop asking about it!",
  "No weird taste or smell. Just a beautiful, comfortable, long-wearing lipstick.",
  "I've replaced all my other lipsticks with Lois Chloe. Nothing compares!",
  "Gorgeous matte look without the dryness. My lips actually feel moisturized.",
  "The best thing I've bought for myself this year. Absolutely worth the price!",
];

const foundationReviews = [
  "Perfect coverage without feeling heavy. My skin looks flawless and natural all day!",
  "The SPF protection is a huge bonus. Foundation + sunscreen in one compact!",
  "This cushion foundation is so easy to apply — just pat and go. Saves so much time!",
  "Survived the Dhaka humidity without melting off. Finally a foundation that works here!",
  "The shade match is perfect for my skin tone. No ashy or orange undertones at all.",
  "Lightweight formula that doesn't clog my pores. My skin actually feels better!",
  "I love the dewy finish it gives. Makes my skin look healthy and radiant.",
  "The coverage is buildable — light for everyday, fuller for special occasions. Love it!",
  "My skin looks so smooth and even-toned with this. It's like a filter in real life!",
  "The compact is so convenient for touch-ups throughout the day. Goes everywhere with me.",
  "No oxidation at all — the color stays true from morning to evening. Impressive!",
  "Finally a foundation that doesn't accentuate my dry patches. So hydrating!",
  "I'm a nurse and this lasted my entire 12-hour shift. Absolutely incredible staying power.",
  "The sponge applicator makes it so easy to get an even, streak-free finish every time.",
  "My skin has never looked this good. People keep asking if I'm wearing makeup!",
  "Perfect for our climate. Humidity-proof and sweat-proof without being cakey.",
  "I've recommended this to everyone at my office. We're all hooked on it now!",
  "The SPF 50 gives me confidence in the sun. Protection + beauty in one product.",
  "So gentle on my sensitive skin. No breakouts or irritation whatsoever.",
  "I can't believe this quality at this price. Competes with international brands easily!",
  "The refill system is so eco-friendly. Love that I don't have to repurchase the compact.",
  "My skin looks naturally beautiful with just a few dabs. Less is definitely more!",
  "Tried many foundations before this — nothing comes close in terms of comfort and coverage.",
  "The shade selection is great. Found my exact match on the first try!",
  "Makes my skin look poreless. Best foundation I've ever used, local or imported.",
  "Love that it's vegan and cruelty-free. Beautiful inside and out!",
  "My go-to for every occasion now. From work meetings to wedding functions!",
  "The hydrating formula keeps my skin plump all day. No midday dryness!",
  "Blends seamlessly into the skin. No visible edges or cakey patches.",
  "I used to import my foundation, but now Lois Chloe is all I need. Saves money too!",
  "This foundation made me confident enough to go out without heavy makeup. Just this + mascara!",
  "The packaging is premium and the product delivers on every promise.",
  "My wedding makeup artist used this on me and I looked flawless in every photo!",
  "So comfortable I forget I'm wearing it. That's the sign of a great foundation.",
  "The satin finish is absolutely perfect — not too matte, not too dewy.",
  "Applied it at 8am and it still looked fresh at 10pm. No touch-ups needed!",
  "I have oily skin and this foundation controls shine beautifully without drying me out.",
  "The cushion format is so hygienic and easy to use. Best foundation innovation!",
  "Love that it doesn't settle into fine lines. Makes my skin look youthful!",
  "Worth every single taka. This is luxury quality at an accessible price point.",
];

const concealerReviews = [
  "Covers my dark circles completely! Such a natural finish that blends beautifully.",
  "The full coverage is incredible. One dot covers everything — blemishes, dark spots, all gone!",
  "Doesn't crease under my eyes even after 8 hours. Finally found the right concealer!",
  "The shade match is spot on for my skin tone. Looks so natural and seamless.",
  "I use this for both under-eye and spot concealing. It does both perfectly!",
  "So blendable and smooth. Doesn't cake up even with powder on top.",
  "My under-eyes look bright and awake all day. Best concealer in Bangladesh!",
  "A little goes a long way — this tube will last me months. Great value!",
  "The formula is hydrating enough that my under-eye area doesn't feel dry.",
  "I've stopped using filters because this concealer makes my skin look flawless!",
  "Perfect consistency — not too thick, not too runny. Easy to work with.",
  "Covers my acne scars beautifully without looking heavy or cakey.",
  "The staying power is amazing. It doesn't budge once it sets!",
  "I wear this alone on no-makeup days and it evens out my skin perfectly.",
  "My go-to for video calls. Makes me look fresh and put-together instantly!",
  "The color doesn't oxidize throughout the day. Love the consistency!",
  "Gentle on my sensitive under-eye area. No irritation at all.",
  "This concealer has replaced my foundation on most days. That's how good it is!",
  "Blends like a dream with just my fingertips. Don't even need a brush!",
  "The best concealer I've used — and I've tried all the big international brands.",
  "Lightweight but covers everything. The formula is truly exceptional.",
  "Bought the 1.5 shade and it's my perfect match. No more guessing games!",
  "My under-eye area looks smooth and crease-free all day long. Amazing!",
  "The packaging is sleek and the applicator makes precise application easy.",
  "Gifted this to my mom and she absolutely loves it. Great for mature skin too!",
  "Stays put in the Dhaka heat. Humidity-proof and sweat-proof!",
  "The coverage is buildable without getting cakey. Professional quality product.",
  "Makes my skin look photoshopped in real life. Can't go back to my old concealer!",
  "I use this every single day and it has never let me down. Consistently excellent.",
  "Love that it's cruelty-free and vegan. Quality with conscience!",
  "The finish is so natural, people think I'm not wearing any makeup.",
  "Perfect for both day and night looks. Versatile and reliable.",
  "My dark circles are GONE. This concealer is magic in a tube!",
  "Such a smooth, creamy texture. Application is effortless every time.",
  "The best beauty purchase I made this year. Absolutely recommend it!",
  "Doesn't settle into fine lines or pores. My skin looks smooth all day.",
  "A must-have in every makeup bag. This concealer is a game-changer!",
  "The shade range caters to our skin tones perfectly. So thoughtful!",
  "I'm a content creator and this concealer looks amazing on camera.",
  "Nothing compares to this. Tried it once and never looked back!",
];

const eyeProductReviews = [
  "The pigmentation is incredible! Such rich color with just one swipe.",
  "Stays on all day without smudging or flaking. Exactly what I needed!",
  "The formula is so smooth and easy to work with. Perfect for beginners too!",
  "Waterproof and smudge-proof — survived rain, tears, and everything in between!",
  "This product has made my eyes pop like never before. So many compliments!",
  "The lasting power is amazing. Applied it in the morning and it was still perfect at night.",
  "Gentle on my sensitive eyes. No irritation or watering at all!",
  "The color intensity is unmatched. Such a luxurious product!",
  "My go-to for both everyday looks and dramatic evening eyes.",
  "The precision is perfect for creating clean lines. So easy to use!",
  "I've tried many brands but this is by far the best eye product I've used.",
  "Doesn't transfer or fade throughout the day. Really impressed!",
  "The formula is creamy yet sets perfectly. No dragging on the delicate eye area.",
  "Makes my eyes look bigger and more defined. Love the effect!",
  "Perfect for our humid climate — doesn't melt or run even in the heat.",
  "Such a professional result for an easy application. My daily essential!",
  "The vegan formula is so gentle. My eyes feel comfortable all day.",
  "Buildable coverage — subtle for day, dramatic for night. Love the versatility!",
  "My wedding eye makeup was done with this and it lasted through all the emotions!",
  "The quality competes with luxury international brands. Proud to use local!",
  "So easy to remove with micellar water. No stubborn residue!",
  "The packaging is elegant and the product delivers premium quality.",
  "I own every shade and use them daily. Can't imagine my routine without it!",
  "My lashes/eyes have never looked better. This product is a game-changer!",
  "Applied before my flight and it was still perfect after 8 hours of travel.",
  "Love that it doesn't clump or flake. Clean, beautiful results every time.",
  "My mom, sister, and I all use this now. It's a family favorite!",
  "The best purchase I've made for my makeup collection this year.",
  "Such a smooth, consistent formula. Never had a bad application day!",
  "As a makeup artist, this is in my professional kit. That says it all!",
  "The color stays true without fading. What you see is what you get!",
  "Doesn't irritate my contact lenses at all. Safe and comfortable!",
  "My eyes look defined and beautiful without any effort. Love this product!",
  "The brush/applicator is perfectly designed for easy, precise application.",
  "Survived a full day at Cox's Bazar beach. Humidity and water-proof tested!",
  "I always get asked what I'm wearing on my eyes. This is my secret weapon!",
  "The formula has gotten even better with time. Lois Chloe keeps improving!",
  "Budget-friendly but premium quality. The best of both worlds!",
  "Every girl in my friend group uses this now. We're all converts!",
  "I never write reviews but this product deserves all the praise!",
];

const skincareSunscreenReviews = [
  "No white cast at all! Finally a sunscreen that works on our skin tone.",
  "Lightweight and non-greasy. Perfect under makeup or on its own!",
  "My skin feels protected without that heavy, sticky feeling. Love it!",
  "The formula absorbs quickly and leaves my skin feeling soft and smooth.",
  "I use this every single day and my skin has improved so much!",
  "No breakouts from this sunscreen. It's gentle enough for my acne-prone skin.",
  "The SPF protection is reliable and my skin hasn't tanned since I started using it.",
  "Such a pleasant texture — feels like a moisturizer, not a sunscreen!",
  "My dermatologist recommended daily SPF and this is the best one I've found.",
  "Doesn't pill under makeup. Perfect as a makeup base!",
  "The hydrating formula keeps my skin moisturized all day long.",
  "I love that it's vegan and cruelty-free. Great product with great values!",
  "Works perfectly in our hot, humid climate without making my face oily.",
  "My whole family uses this now — from my mom to my teenage sister!",
  "The best sunscreen available in Bangladesh. I've tried them all!",
  "No stinging around my eyes like other sunscreens. So gentle!",
  "My skin texture has improved significantly since I started using this daily.",
  "Affordable and effective. Can't ask for more from a sunscreen!",
  "The finish is so natural — no one can tell I'm wearing sunscreen.",
  "Finally a product that takes our climate seriously. Made for us!",
  "I've recommended this to all my friends and they all love it.",
  "The packaging is travel-friendly and perfect for keeping in my bag.",
  "My skin glows when I use this as my base. Such a beautiful finish!",
  "Reapplication is easy and doesn't mess up my makeup. So convenient!",
  "The best investment for my skin health. Prevention is better than cure!",
  "No pilling, no white cast, no greasiness. The perfect sunscreen formula!",
  "I'm a dermatology resident and I approve of this formulation. Very well made!",
  "My pigmentation has faded significantly since I started wearing this daily.",
  "Such a luxurious feel for an everyday product. Makes sunscreen actually enjoyable!",
  "I apply this on my kids too. Gentle enough for the whole family!",
  "The consistency is perfect — spreads easily without needing too much product.",
  "Finally stopped importing my sunscreen. This is just as good, if not better!",
  "My skin has never looked healthier. Consistent SPF protection makes a difference!",
  "Love that it's clinically tested. Gives me confidence in the product.",
  "The moisturizing properties mean I can skip one step in my routine!",
  "An absolute must-have for anyone living in Bangladesh. Sun protection is key!",
  "My acne scars have faded since I started using this. Sun damage was making them worse!",
  "The texture is divine — silky smooth without any heaviness.",
  "Best skincare purchase I've made this year. My skin thanks me every day!",
  "I keep one at home and one in my office. Never miss a reapplication!",
];

const paletteReviews = [
  "The colors are stunning! So pigmented and easy to blend. My go-to palette now!",
  "Every shade in this palette is wearable. No filler colors at all!",
  "The pigmentation is incredible — a little goes a long way. Great value!",
  "I use this palette every single day. It has everything I need for any look!",
  "The shimmer shades are buttery smooth and the mattes blend like a dream.",
  "Such a beautiful color story. Perfect for Bangladeshi skin tones!",
  "The mirror inside is a nice touch. Great for on-the-go touch-ups!",
  "I've hit pan on two shades already because I use them so much. Repurchasing for sure!",
  "These colors photograph beautifully. My Instagram selfies have never looked better!",
  "The formula is comparable to international luxury brands. So proud of Lois Chloe!",
  "Gifted this to my best friend and she's already asking for another shade!",
  "No fallout at all when applying. Clean, precise color every single time.",
  "The color selection is so well curated. Day to night looks in one palette!",
  "My makeup artist friends are all switching to this. Professional quality!",
  "The compact is sturdy and the packaging feels luxurious. Love it!",
  "These shades look even more beautiful on deeper skin tones. Inclusive and gorgeous!",
  "I was skeptical at first but after one use, I was completely sold. Incredible quality!",
  "The blendability is out of this world. Even beginners can create stunning looks!",
  "My most-used palette in my entire collection. Everything else is gathering dust!",
  "The staying power is impressive — my look stays intact all day without primer!",
  "Colors are true to pan — what you see is exactly what you get on the skin.",
  "The texture is so soft and silky. A joy to use every morning!",
  "I own all the Lois Chloe palettes and this one is my absolute favorite!",
  "The shades work beautifully together. Creating cohesive looks is so easy!",
  "No creasing or fading throughout the day. These formulas are top-notch!",
  "Worth every taka! Quality that rivals palettes three times the price.",
  "My whole makeup look is based around this palette. It's that versatile!",
  "The colors complement our warm skin tones perfectly. Such a thoughtful range!",
  "Even after months of use, the quality hasn't changed. Consistently excellent!",
  "This palette has made me a better makeup artist. The formulas are so forgiving!",
  "I always reach for this first when doing my makeup. It's simply the best!",
  "The glow this gives is absolutely ethereal. My skin looks lit from within!",
  "Perfect for both subtle everyday looks and glamorous evening makeup.",
  "I've been complimented on my blush/highlighter so many times since using this!",
  "The textures are heavenly — smooth, blendable, and so pigmented!",
  "My students ask me what palette I use and I always say Lois Chloe!",
  "No patchiness or uneven application. Foolproof and beautiful every time!",
  "The shade names are so cute and the product lives up to the luxury branding!",
  "I can create at least 20 different looks with just this one palette. Amazing range!",
  "This is the palette that made me a Lois Chloe loyalist. Pure quality!",
];

const powderReviews = [
  "Sets my makeup beautifully without looking cakey. The perfect finishing touch!",
  "My skin looks airbrushed after applying this. Such a fine, smooth texture!",
  "Controls oil all day long. My T-zone stays matte without looking dry!",
  "The translucent formula works on every skin tone. Truly universal!",
  "No flashback in photos — I look flawless in every picture!",
  "This powder has extended the life of my makeup by hours. A game-changer!",
  "So finely milled that it feels like nothing on the skin. Love the weightless feel!",
  "My pores look invisible after setting with this. Smooth, refined skin all day!",
  "Perfect for touch-ups — just press and go. Takes 10 seconds!",
  "The packaging is compact and travel-friendly. My travel bag essential!",
  "I've been using this for months and it still works perfectly every time.",
  "Prevents my concealer from creasing. My under-eyes look smooth all day!",
  "The best setting powder in Bangladesh. Nothing else comes close!",
  "No chalkiness or white cast. Just a beautiful, natural matte finish.",
  "My oily skin has finally met its match. This powder is a lifesaver!",
  "A little product goes a long way. This will last me forever!",
  "Blurs imperfections beautifully while still looking natural and skin-like.",
  "The micro-fine texture is luxury quality. Feels incredible on the skin!",
  "I bake with this under my eyes and the results are stunning!",
  "My go-to for any event where I need my makeup to last. Never disappoints!",
  "Works well with both powder and liquid foundations. Very versatile!",
  "My selfie game has improved dramatically since using this. Flawless finish!",
  "The formula is gentle and doesn't clog my pores. Skin-friendly quality!",
  "I apply this even on no-makeup days just to blur my pores. That good!",
  "Survived a full outdoor wedding in the summer heat. Impressed!",
  "The product has converted me from loose powder to this. So much easier!",
  "No creasing, no caking, no issues. Just perfect, set makeup all day.",
  "My makeup lasts from Fajr to Isha now. This powder is incredible!",
  "The matte finish is refined, not flat. My skin still looks healthy!",
  "Everyone in my office wants to know my secret. It's this powder!",
  "I keep one at home and one in my purse. Can't live without it!",
  "The quality reminds me of high-end department store brands. Luxurious!",
  "My mature skin loves this — doesn't settle into fine lines at all.",
  "Perfect for our climate. Controls sweat and shine beautifully!",
  "The best makeup investment I've made. Elevates every other product I wear!",
  "I've tried international setting powders and this outperforms most of them.",
  "The vegan formula means I can use it guilt-free. Love the ethics!",
  "Doesn't change the color of my foundation. True translucent quality!",
  "The smoothest, most refined setting powder I've ever used. Period.",
  "Just rebought this for the third time. That should tell you everything!",
];

const brushSetReviews = [
  "The softest brushes I've ever used! They don't shed and blend makeup perfectly.",
  "Professional quality at an affordable price. Every brush is well-made and functional!",
  "The bristles are incredibly soft on my skin. No irritation at all!",
  "This set has every brush I need for a full face. No need to buy separately!",
  "The handles are sturdy and comfortable to hold. Really well-designed!",
  "My makeup application has improved significantly since switching to these brushes.",
  "The powder brush gives the most beautiful, airbrushed finish!",
  "No shedding even after multiple washes. The quality is impressive!",
  "The travel-friendly size is perfect. I take them everywhere with me!",
  "As a makeup artist, these are in my professional kit. Top-notch quality!",
  "The contour brush blends seamlessly. My cheekbones have never looked better!",
  "Gifted these to my sister and she absolutely loves them. Perfect gift idea!",
  "The eye brushes are the perfect size for precise shadow application.",
  "Easy to clean and dry quickly. Low maintenance, high performance!",
  "The blending brush is my favorite — creates the most seamless eyeshadow looks!",
  "I compared these to international brands and the quality is on par. Amazing!",
  "Each brush serves its purpose perfectly. No redundant brushes in this set!",
  "The bristles hold product well and deposit color evenly. Professional results!",
  "My makeup looks more polished since I started using proper brushes. Game changer!",
  "The case/packaging keeps everything organized and protected. Thoughtful design!",
  "I've had these for 6 months and they still look and feel brand new.",
  "The foundation brush gives such a flawless, streak-free finish!",
  "Worth the investment. Good brushes make such a difference in makeup application!",
  "My friends always borrow my brushes because they're so nice. Getting them their own set!",
  "The lip brush gives such precise application. Perfect for bold lip looks!",
  "The fan brush is perfect for highlighter. Gives a subtle, beautiful glow!",
  "No animal hair — these vegan brushes are just as good, if not better!",
  "I'm a beauty student and my instructor complimented my brush set. Proud moment!",
  "The bristles are dense but soft. Perfect for buffing in liquid products!",
  "Best brushes available locally. I've stopped looking at imported options!",
  "These make blending so effortless. Even complex eye looks are easy now!",
  "The quality is consistent across every brush in the set. No weak links!",
  "My everyday makeup routine is faster and better thanks to these brushes.",
  "The flat foundation brush is my holy grail. Smoothest application ever!",
  "Perfect for beginners and professionals alike. Versatile and forgiving!",
  "I use the blush brush daily and it distributes color so evenly. Love it!",
  "The duo fiber brush is incredible for a natural, skin-like finish.",
  "My makeup has never looked more professional. These brushes are the reason!",
  "The concealer brush is tiny and precise — perfect for hard-to-reach areas!",
  "I've recommended these to everyone and the feedback is always positive!",
];

const lipOilReviews = [
  "My lips feel so hydrated and the glossy finish is gorgeous! Absolutely love it!",
  "The formula is so nourishing. My dry, chapped lips are a thing of the past!",
  "Such a beautiful, natural shine without the sticky feel of regular lip gloss.",
  "I wear this alone and over lipstick — both ways look stunning!",
  "The subtle color tint is so pretty. Gives my lips a healthy, natural flush!",
  "My lips have never felt softer. This lip oil is pure luxury!",
  "The applicator makes it so easy to apply. Smooth, even coverage every time.",
  "I'm addicted to reapplying this — the feel and finish are heavenly!",
  "Smells amazing and feels even better. My new lip care essential!",
  "Works as a great base before lipstick. My lips stay moisturized all day.",
  "The gloss level is perfect — visible shine without looking overdone.",
  "I bought this out of curiosity and now I can't live without it. Obsessed!",
  "My lipstick lasts longer when I layer this underneath. Great combo!",
  "The lightweight formula doesn't weigh down my lips like traditional glosses.",
  "Perfect for our climate — hydrating without being greasy in the heat!",
  "I use this as an overnight lip treatment too. Wake up with baby-soft lips!",
  "The packaging is so chic. Looks beautiful in my makeup bag!",
  "This has replaced my lip balm. More hydrating and looks so much prettier!",
  "My lips literally glow after applying this. Healthy, plump, and beautiful!",
  "The best lip oil I've found in Bangladesh. International quality for sure!",
  "I layer this over my Lois Chloe matte lipstick and the result is stunning!",
  "No irritation on my sensitive lips. Gentle, soothing, and gorgeous!",
  "My nighttime lip care routine is now just this lip oil. Simplified and effective!",
  "The hydration lasts for hours. My lips stay soft even after it wears off.",
  "Such a thoughtful product. Lois Chloe really understands what our lips need!",
  "I've gotten so many compliments on my lips since using this. Natural beauty!",
  "Perfect for minimalist makeup days. Just this + mascara and I'm ready!",
  "The formula absorbs nicely without leaving a residue. Clean, comfortable feel!",
  "My new favorite lip product. I carry it everywhere for touch-ups!",
  "Worth every taka! My lips have transformed since I started using this.",
  "The scent is subtle and pleasant. Not overpowering at all.",
  "I apply this before bed and wake up with the softest lips ever!",
  "The best addition to Lois Chloe's lineup. This brand keeps getting better!",
  "I didn't know I needed a lip oil until I tried this one. Now I'm hooked!",
  "The dewy finish makes my lips look fuller and healthier. Love the effect!",
  "My whole friend group is buying this now. It's that good!",
  "This lip oil is the cherry on top of any makeup look. Beautiful!",
  "Finally a lip product that actually treats my lips while looking gorgeous!",
  "The non-sticky formula is a dream. Comfortable enough to wear all day!",
  "I have dry lips year-round and this is the only product that truly helps!",
];

const generalReviews = [
  "Excellent product! The quality is outstanding and it exceeded my expectations.",
  "I'm so impressed with this product. Will definitely be ordering again!",
  "Arrived quickly and the packaging was beautiful. Product itself is top quality!",
  "Love supporting a Bangladeshi brand that delivers international-level quality!",
  "My favorite product from Lois Chloe. The formula is simply amazing!",
  "Been using this for weeks now and I'm still in love. Consistently great quality!",
  "The best beauty product I've purchased this year. Worth every taka!",
  "I was hesitant at first but this product completely won me over. Amazing!",
  "Such a well-made product. You can tell the quality from the moment you open it!",
  "Finally found a product that actually delivers on its promises. Highly recommend!",
  "The vegan formula is a huge plus. Great product with great values!",
  "I've tried many brands but Lois Chloe stands out in quality and finish.",
  "Gifted this to my best friend and she's obsessed! Ordering more as gifts.",
  "The product photos are accurate — what you see is truly what you get!",
  "My daily essential now. Can't imagine my routine without this product!",
  "The Australian testing standards really show in the quality. Impressive!",
  "I keep coming back to this product. Nothing else compares in its category!",
  "Perfect for the Bangladeshi market — made for our needs and preferences!",
  "The cruelty-free certification gives me peace of mind. Love this brand!",
  "My mom asked to borrow mine and now she wants her own. Family approved!",
  "The BSTI approval gives me confidence in the safety. Trusted quality!",
  "I've replaced my imported products with Lois Chloe. No regrets at all!",
  "Such a premium feel from a local brand. Proud to support Lois Chloe!",
  "Every single product I've tried from this brand has impressed me. Loyal customer!",
  "I've told all my friends about this. The word of mouth is strong because the product is just that good!",
  "The quality is remarkable. You'd never guess this is a Bangladeshi brand!",
  "My whole beauty routine is Lois Chloe now. Consistent quality across all products!",
  "The customer service is great too. Had a question and they responded quickly!",
  "I ordered online and it arrived in perfect condition. Great shopping experience!",
  "The price point is fair for the quality you get. Excellent value!",
  "I've been using this product for months and the quality has been consistent throughout.",
  "Clinically tested in Australia — that's a level of care I appreciate in a beauty brand!",
  "The formula is gentle yet effective. Perfect for my sensitive skin!",
  "I bought this on a recommendation and I'm so glad I did. 10/10!",
  "This product has earned a permanent spot in my collection. Absolutely love it!",
  "The packaging is beautiful and the product quality matches. Total package!",
  "I love everything about this — the formula, the packaging, the results. Perfect!",
  "Lois Chloe keeps raising the bar. This product is proof of their commitment to quality!",
  "My confidence has improved since using Lois Chloe products. They really work!",
  "The best investment I've made in my beauty routine. Highly, highly recommend!",
];

// Map product categories to review pools
function getReviewPool(productName) {
  const name = productName.toLowerCase();
  if (name.includes("lip oil") || name.includes("rouge")) return lipOilReviews;
  if (name.includes("lipstick") || name.includes("lip")) return lipstickReviews;
  if (name.includes("foundation") || name.includes("cushion")) return foundationReviews;
  if (name.includes("concealer")) return concealerReviews;
  if (name.includes("mascara") || name.includes("eyeliner") || name.includes("gel eyeliner")) return eyeProductReviews;
  if (name.includes("sunscreen") || name.includes("cream") || name.includes("revitalize")) return skincareSunscreenReviews;
  if (name.includes("palette") || name.includes("blush") || name.includes("highlighter")) return paletteReviews;
  if (name.includes("powder") || name.includes("setting")) return powderReviews;
  if (name.includes("brush")) return brushSetReviews;
  return generalReviews;
}

function generateRating() {
  // Target avg >= 4.8, so mostly 5s with some 4s
  const rand = Math.random();
  if (rand < 0.82) return 5;  // 82% chance of 5
  if (rand < 0.97) return 4;  // 15% chance of 4 (avg ~ 4.82)
  return 5; // remaining 3% also 5
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateReviewerName(usedNames) {
  let name;
  let attempts = 0;
  do {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastInitials[Math.floor(Math.random() * lastInitials.length)];
    name = `${first} ${last}`;
    attempts++;
  } while (usedNames.has(name) && attempts < 100);
  usedNames.add(name);
  return name;
}

function generateReviews(productName, count = 40) {
  const pool = getReviewPool(productName);
  const usedNames = new Set();
  const reviews = [];

  // Shuffle and cycle through reviews
  let shuffledPool = shuffleArray(pool);
  let poolIndex = 0;

  for (let i = 0; i < count; i++) {
    if (poolIndex >= shuffledPool.length) {
      shuffledPool = shuffleArray(pool);
      poolIndex = 0;
    }

    const rating = generateRating();
    const name = generateReviewerName(usedNames);

    reviews.push({
      name,
      rating,
      comment: shuffledPool[poolIndex],
      email: null,
      images: [],
    });

    poolIndex++;
  }

  return reviews;
}

function calculateAvgRating(reviews) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}

async function seedAllProducts() {
  try {
    // Get all published non-offer products
    const products = await db.listDocuments(DATABASE_ID, PRODUCT_COLLECTION, [
      Query.equal("Published", [true]),
      Query.notEqual("parent_category", "offer"),
      Query.limit(100),
    ]);

    console.log(`Found ${products.total} products to seed with reviews.\n`);

    for (const product of products.documents) {
      const existingReviews = product.reviews || [];
      const newReviews = generateReviews(product.name, 40);
      const allReviews = [...existingReviews, ...newReviews];
      const avgRating = calculateAvgRating(allReviews);

      console.log(
        `Updating: ${product.name} — ${existingReviews.length} existing + 40 new = ${allReviews.length} total, avg: ${avgRating.toFixed(2)}`
      );

      try {
        await db.updateDocument(DATABASE_ID, PRODUCT_COLLECTION, product.$id, {
          reviews: allReviews,
          avg_rating: avgRating,
        });
        console.log(`  ✓ Done\n`);
      } catch (err) {
        console.error(`  ✗ Failed: ${err.message}\n`);
      }

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 300));
    }

    console.log("\n=== All products seeded with reviews! ===");
  } catch (error) {
    console.error("Fatal error:", error);
  }
}

seedAllProducts();
