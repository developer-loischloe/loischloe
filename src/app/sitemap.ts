import { MetadataRoute } from "next";
import config from "@/config";
import appwriteProductService from "@/appwrite/appwriteProductService";
import appwriteBlogService from "@/appwrite/appwriteBlogService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await appwriteProductService.getProductList({
    p_category: "",
    c_category: "",
    n_category: "",
    keyword: "",
    page: "1",
    resultPerPage: "1000",
  });

  const blogs = await appwriteBlogService.getAllBlog({
    page: "1",
    resultPerPage: "1000",
  });

  const productRoutes: MetadataRoute.Sitemap = products.documents.map(
    ({ slug, $updatedAt }) => ({
      url: `${config.next_app_base_url}/products/${slug}`,
      lastModified: new Date($updatedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = blogs.documents.map(
    ({ slug, $updatedAt }) => ({
      url: `${config.next_app_base_url}/blog/${slug}`,
      lastModified: new Date($updatedAt),
      changeFrequency: "monthly",
      priority: 0.4,
    })
  );

  return [
    {
      url: `${config.next_app_base_url}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${config.next_app_base_url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${config.next_app_base_url}/combo-deals`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${config.next_app_base_url}/products`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...productRoutes,
    {
      url: `${config.next_app_base_url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...blogRoutes,
  ];
}
