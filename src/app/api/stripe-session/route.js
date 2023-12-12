import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
const message = "No Data Found";
const stripe = new Stripe(key, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  try {
    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        
        invoice_creation: {
          enabled: true,
        },
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${request.headers.get("origin")}/success`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}