import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise = null;
const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const getStripePromise = ()=>{
    if(!stripePromise){
        stripePromise = loadStripe(key);
    }
    return stripePromise;

}
export default getStripePromise;