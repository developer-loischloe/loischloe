import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with LOIS CHLOE Bangladesh. Reach us via WhatsApp, email, or our social media channels for product enquiries, orders, and support.",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  return (
    <section className="max-w-4xl mx-auto py-10 px-5 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="heading-1">Contact Us</h1>
        <p className="text-brand_gray">
          We&apos;d love to hear from you. Reach out through any of the channels
          below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WhatsApp */}
        <div className="border rounded-lg p-6 space-y-3">
          <h2 className="text-xl font-semibold">WhatsApp</h2>
          <p className="text-brand_gray">
            For quick enquiries and order support, message us on WhatsApp.
          </p>
          <Link
            href="https://wa.me/8801XXXXXXXXX"
            target="_blank"
            className="inline-block text-brand_primary hover:underline font-medium"
          >
            +880 1XXX-XXXXXX
          </Link>
        </div>

        {/* Email */}
        <div className="border rounded-lg p-6 space-y-3">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-brand_gray">
            Send us an email and we&apos;ll respond within 24 hours.
          </p>
          <Link
            href="mailto:developer.loischloe@gmail.com"
            className="inline-block text-brand_primary hover:underline font-medium"
          >
            developer.loischloe@gmail.com
          </Link>
        </div>

        {/* Facebook */}
        <div className="border rounded-lg p-6 space-y-3">
          <h2 className="text-xl font-semibold">Facebook</h2>
          <p className="text-brand_gray">
            Follow us and send a message on Facebook.
          </p>
          <Link
            href="https://www.facebook.com/Loischloe.asia"
            target="_blank"
            className="inline-block text-brand_primary hover:underline font-medium"
          >
            facebook.com/Loischloe.asia
          </Link>
        </div>

        {/* TikTok */}
        <div className="border rounded-lg p-6 space-y-3">
          <h2 className="text-xl font-semibold">TikTok</h2>
          <p className="text-brand_gray">
            Watch our beauty tutorials and follow us on TikTok.
          </p>
          <Link
            href="https://www.tiktok.com/@loischloe.bangladesh"
            target="_blank"
            className="inline-block text-brand_primary hover:underline font-medium"
          >
            @loischloe.bangladesh
          </Link>
        </div>
      </div>

      <div className="border rounded-lg p-6 space-y-3">
        <h2 className="text-xl font-semibold">Business Hours</h2>
        <p className="text-brand_gray">
          Saturday – Thursday: 10:00 AM – 8:00 PM (BST)
          <br />
          Friday: Closed
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
