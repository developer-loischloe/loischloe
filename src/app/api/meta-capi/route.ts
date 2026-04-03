/**
 * Meta Conversions API (CAPI) Route Handler
 *
 * This API route sends events directly to Meta's servers,
 * bypassing browser-based tracking entirely. This:
 *  - Improves Event Match Quality (currently 6.1/10)
 *  - Provides reliable Purchase event tracking
 *  - Works even when ad blockers prevent the browser pixel
 *
 * SETUP REQUIRED:
 * 1. Generate an access token in Events Manager > Settings > Generate access token
 * 2. Add it to your .env.local file as META_CAPI_ACCESS_TOKEN
 *
 * Add to .env.local:
 *   META_PIXEL_ID=1148015303657843
 *   META_CAPI_ACCESS_TOKEN=your_access_token_here
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1148015303657843";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || "";
const GRAPH_API_VERSION = "v21.0";

// Hash helper for user data (Meta requires SHA-256 hashing)
function hashValue(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    if (!ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "META_CAPI_ACCESS_TOKEN not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      eventName,
      eventTime,
      sourceUrl,
      // User data
      email,
      phone,
      firstName,
      lastName,
      city,
      // Event data
      content_ids,
      currency,
      value,
      order_id,
    } = body;

    // Build user_data with hashed PII
    const userData: Record<string, any> = {
      client_ip_address:
        request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "0.0.0.0",
      client_user_agent: request.headers.get("user-agent") || "",
    };

    // Get fbp and fbc cookies for deduplication
    const cookies = request.cookies;
    const fbp = cookies.get("_fbp")?.value;
    const fbc = cookies.get("_fbc")?.value;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    // Hash and add user PII if provided
    if (email) userData.em = [hashValue(email)];
    if (phone) userData.ph = [hashValue(phone.replace(/[^0-9]/g, ""))];
    if (firstName) userData.fn = [hashValue(firstName)];
    if (lastName) userData.ln = [hashValue(lastName)];
    if (city) userData.ct = [hashValue(city)];
    userData.country = [hashValue("bd")]; // Bangladesh

    // Build the event payload
    const eventData: Record<string, any> = {
      event_name: eventName,
      event_time: eventTime || Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: sourceUrl,
      user_data: userData,
    };

    // Add custom_data for e-commerce events
    if (content_ids || value || currency) {
      eventData.custom_data = {};
      if (content_ids) eventData.custom_data.content_ids = content_ids;
      if (currency) eventData.custom_data.currency = currency;
      if (value) eventData.custom_data.value = value;
      if (order_id) eventData.custom_data.order_id = order_id;
    }

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [eventData],
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result);
      return NextResponse.json(
        { error: "Failed to send event", details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, events_received: result.events_received });
  } catch (error) {
    console.error("Meta CAPI route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
