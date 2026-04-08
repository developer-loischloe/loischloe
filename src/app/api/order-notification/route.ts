import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { shippingInformation, orderItems, paymentInformation, orderId } =
      body;

    const shipping = shippingInformation || {};
    const payment = paymentInformation || {};
    const items = orderItems || [];

    // Build order items table rows
    const itemRows = items
      .map(
        (item: any, i: number) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;">${i + 1}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.productName || item.product || "N/A"}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity || 1}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">৳${item.price || 0}</td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:#1A4A4A;padding:20px;text-align:center;">
          <h1 style="color:#C9A84C;margin:0;font-size:24px;">LOIS CHLOE</h1>
          <p style="color:#fff;margin:5px 0 0;font-size:14px;">New Order Received</p>
        </div>

        <div style="padding:20px;background:#f9f9f9;border:1px solid #eee;">
          <h2 style="color:#1A4A4A;margin-top:0;">Order #${orderId || "N/A"}</h2>

          <h3 style="color:#1A4A4A;border-bottom:2px solid #C9A84C;padding-bottom:5px;">Customer Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr><td style="padding:4px 0;color:#666;width:120px;">Name:</td><td style="padding:4px 0;font-weight:bold;">${shipping.name || "N/A"}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Phone:</td><td style="padding:4px 0;font-weight:bold;">${shipping.phone || "N/A"}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Email:</td><td style="padding:4px 0;">${shipping.email || "N/A"}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">District:</td><td style="padding:4px 0;font-weight:bold;">${shipping.district || "N/A"}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Address:</td><td style="padding:4px 0;">${shipping.address || "N/A"}</td></tr>
            ${shipping.order_notes ? `<tr><td style="padding:4px 0;color:#666;">Notes:</td><td style="padding:4px 0;">${shipping.order_notes}</td></tr>` : ""}
            ${shipping.gift_wrap ? `<tr><td style="padding:4px 0;color:#666;">Gift Wrap:</td><td style="padding:4px 0;">Yes${shipping.gift_message ? ` - "${shipping.gift_message}"` : ""}</td></tr>` : ""}
          </table>

          <h3 style="color:#1A4A4A;border-bottom:2px solid #C9A84C;padding-bottom:5px;">Order Items</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <thead>
              <tr style="background:#1A4A4A;color:#C9A84C;">
                <th style="padding:8px 12px;text-align:left;">#</th>
                <th style="padding:8px 12px;text-align:left;">Product</th>
                <th style="padding:8px 12px;text-align:center;">Qty</th>
                <th style="padding:8px 12px;text-align:right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <h3 style="color:#1A4A4A;border-bottom:2px solid #C9A84C;padding-bottom:5px;">Payment Summary</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:4px 0;color:#666;">Subtotal:</td><td style="padding:4px 0;text-align:right;">৳${payment.product_price || 0}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Shipping:</td><td style="padding:4px 0;text-align:right;">৳${payment.shipping_cost || 0}</td></tr>
            ${payment.discount > 0 ? `<tr><td style="padding:4px 0;color:#666;">Discount:</td><td style="padding:4px 0;text-align:right;color:green;">-৳${payment.discount}</td></tr>` : ""}
            <tr style="border-top:2px solid #1A4A4A;"><td style="padding:8px 0;font-weight:bold;font-size:16px;color:#1A4A4A;">Total:</td><td style="padding:8px 0;text-align:right;font-weight:bold;font-size:16px;color:#1A4A4A;">৳${payment.total_price || 0}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Payment:</td><td style="padding:4px 0;text-align:right;">${payment.payment_method === "cash-on-delivery" ? "Cash on Delivery" : payment.payment_method || "N/A"}</td></tr>
          </table>
        </div>

        <div style="text-align:center;padding:15px;color:#666;font-size:12px;">
          <p>This is an automated notification from loischloe.com.bd</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "LOIS CHLOE Orders <onboarding@resend.dev>",
      to: ["developer.loischloe@gmail.com"],
      subject: `New Order #${orderId || "N/A"} - ${shipping.name || "Customer"} (৳${payment.total_price || 0})`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Order notification error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
