import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderEmailRequest {
  orderId: string;
  userEmail: string;
  userName: string;
  orderTotal: number;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  deliveryAddress: any;
  status: string;
}

const escapeHtml = (str: string): string => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { orderId, userEmail, userName, orderTotal, orderItems, deliveryAddress, status }: OrderEmailRequest = await req.json();

    // Sanitize all user-provided strings
    const safeUserName = escapeHtml(userName || '');
    const safeOrderId = escapeHtml((orderId || '').slice(0, 8));
    const safeTotal = Number(orderTotal).toFixed(2);

    let subject = "";
    let htmlContent = "";

    if (status === "confirmed") {
      subject = `Order Confirmed - #${safeOrderId}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Order Confirmed!</h1>
          <p>Dear ${safeUserName},</p>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${safeOrderId}</p>
            <p><strong>Total Amount:</strong> ₹${safeTotal}</p>
            
            <h4>Items:</h4>
            <ul>
              ${(orderItems || []).map(item => `
                <li>${escapeHtml(item.name)} - Qty: ${Number(item.quantity)} - ₹${(Number(item.price) * Number(item.quantity)).toFixed(2)}</li>
              `).join('')}
            </ul>
            
            <h4>Delivery Address:</h4>
            <p>
              ${escapeHtml(deliveryAddress?.street || '')}<br>
              ${escapeHtml(deliveryAddress?.city || '')}, ${escapeHtml(deliveryAddress?.state || '')}<br>
              Pincode: ${escapeHtml(deliveryAddress?.pincode || '')}<br>
              Phone: ${escapeHtml(deliveryAddress?.phone || '')}
            </p>
          </div>
          
          <p>We'll notify you when your order is shipped.</p>
          <p>Thank you for shopping with us!</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            If you have any questions, please contact our support team.
          </p>
        </div>
      `;
    } else if (status === "shipped") {
      subject = `Order Shipped - #${safeOrderId}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #059669;">Order Shipped!</h1>
          <p>Dear ${safeUserName},</p>
          <p>Great news! Your order #${safeOrderId} has been shipped and is on its way to you.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Total Amount:</strong> ₹${safeTotal}</p>
            <p>Expected delivery in 3-5 business days.</p>
          </div>
          
          <p>Thank you for your patience!</p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Health Store <onboarding@resend.dev>",
      to: [userEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
