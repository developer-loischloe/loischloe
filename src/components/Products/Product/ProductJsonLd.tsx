export default function ProductJsonLd({ product }: { product: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name,
    description: product?.short_description
      ? product.short_description.replace(/<[^>]*>/g, "").substring(0, 300)
      : "",
    image: product?.images?.map((img: any) => img?.image_url).filter(Boolean),
    brand: {
      "@type": "Brand",
      name: "LOIS CHLOE",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.loischloe.com.bd/products/${product?.slug}`,
      priceCurrency: "BDT",
      price: product?.sale_price || product?.price,
      availability:
        product?.stock === "in-stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "LOIS CHLOE Bangladesh",
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Vegan", value: "Yes" },
      { "@type": "PropertyValue", name: "Cruelty-Free", value: "Yes" },
      { "@type": "PropertyValue", name: "Made In", value: "Australia" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
