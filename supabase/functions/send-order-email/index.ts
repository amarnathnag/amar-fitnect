
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, userEmail, userName, orderTotal, orderItems, deliveryAddress, status }: OrderEmailRequest = await req.json();

    let subject = "";
    let htmlContent = "";

    if (status === "confirmed") {
      subject = `Order Confirmed - #${orderId.slice(0, 8)}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Order Confirmed!</h1>
          <p>Dear ${userName},</p>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${orderId.slice(0, 8)}</p>
            <p><strong>Total Amount:</strong> ₹${orderTotal.toFixed(2)}</p>
            
            <h4>Items:</h4>
            <ul>
              ${orderItems.map(item => `
                <li>${item.name} - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</li>
              `).join('')}
            </ul>
            
            <h4>Delivery Address:</h4>
            <p>
              ${deliveryAddress.street}<br>
              ${deliveryAddress.city}, ${deliveryAddress.state}<br>
              Pincode: ${deliveryAddress.pincode}<br>
              Phone: ${deliveryAddress.phone}
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
      subject = `Order Shipped - #${orderId.slice(0, 8)}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #059669;">Order Shipped!</h1>
          <p>Dear ${userName},</p>
          <p>Great news! Your order #${orderId.slice(0, 8)} has been shipped and is on its way to you.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Total Amount:</strong> ₹${orderTotal.toFixed(2)}</p>
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
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
