const config = {
  // App Base URl
  next_app_base_url: String(process.env.NEXT_PUBLIC_APP_BASE_URL),
  // Appwrite Base
  appwrite_API_key: String(process.env.NEXT_APPWRITE_API_KEY),
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  // Database Id
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteBlogDatabaseId: String(
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_DATABASE_ID
  ),
  // Collection (Utils)
  appwriteUtils: {
    collectionId: String(process.env.NEXT_PUBLIC_APPWRITE_UTILS_COLLECTION_ID),
    documentId: String(process.env.NEXT_PUBLIC_APPWRITE_UTILS_DOCUMENT_ID),
  },
  // Collection
  appwriteCollectionId: {
    product: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCT),
    product_review: String(
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCT_REVIEW
    ),
    product_image: String(
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCT_IMAGE
    ),
    category: {
      parent_category: String(
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PARENT_CATEGORY
      ),
      child_category: String(
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CHILD_CATEGORY
      ),
      nested_child_category: String(
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_NESTED_CHILD_CATEGORY
      ),
    },
    order: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ORDER),
  },
  // Collection (Inventory)
  appwriteInventoryCollectionId: {
    inventory: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVENTORY),
    inventory_retail_shop: String(
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVENTORY_RETAIL_SHOP
    ),
    inventory_retail_shop_item: String(
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_INVENTORY_RETAIL_SHOP_ITEM
    ),
  },
  // Collection (Blog)
  appwriteBlogCollectionId: {
    blog: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_BLOG),
    all_category: String(
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_BLOG_ALL_CATEGORIES
    ),
  },
  // Collection (Newsletter)
  appwriteNewsletterCollection_Id: String(
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_NEWSLETTER
  ),
  // Storage Bucket
  appwriteBucketId: {
    product_image: String(
      process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_PRODUCT_IMAGE
    ),
    review_image: String(
      process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_REVIEW_IMAGE
    ),
    blog: String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_BLOG),
    avatar: String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_AVATAR),
  },
};

export default config;
