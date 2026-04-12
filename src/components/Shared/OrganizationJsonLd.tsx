export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LOIS CHLOE",
    alternateName: "LOIS CHLOE Bangladesh",
    url: "https://www.loischloe.com.bd",
    logo: "https://www.loischloe.com.bd/og_image.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@loischloe.com.bd",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.facebook.com/Loischloe.asia",
      "https://www.instagram.com/loischloe_bangladesh",
      "https://www.tiktok.com/@loischloe.bd",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
