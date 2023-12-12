// pages/api/checkout.js
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      cardHolderName,
      mm,
      yy,
      securityCode,
      billingAddress1,
      cardNumber,
      city,
      zipCode,
      phoneNumber,
      country,
      userEmail,
    } = req.body;

    try {
      // Create a payment method for the card details
      // Note: This is sensitive operation and should be done with caution.
      // It's generally better to use Stripe Elements or Payment Request Button to handle card details.
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: mm,
          exp_year: yy,
          cvc: securityCode,
        },
        billing_details: {
          name: cardHolderName,
          address: {
            line1: billingAddress1,
            city: city,
            postal_code: zipCode,
            country: country,
          },
          phone: phoneNumber,
        },
      });

      // Create a customer to associate with the payment method
      const customer = await stripe.customers.create({
        payment_method: paymentMethod.id,
        email: userEmail, // replace with customer's email, if available
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });

      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer.id,
        line_items: [
          // Replace this with the actual items the user is purchasing
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Product or Service Name',
              },
              unit_amount: 10, // Replace with actual amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ session });
    } catch (err) {
      console.error(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
