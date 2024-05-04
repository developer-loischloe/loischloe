const config = {
  next_app_base_url: String(process.env.NEXT_PUBLIC_APP_BASE_URL),
  appwrite_API_key: String(process.env.NEXT_APPWRITE_API_KEY),
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteCollectionId: {
    product: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCT),
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
  appwriteBucketId: {
    review_image: String(
      process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_REVIEW_IMAGE
    ),
  },
};

export default config;
