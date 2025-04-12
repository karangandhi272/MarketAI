import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '../../lib/supabase';

// Initialize Stripe (replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

interface StripePaymentProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

// Stripe Payment Form inner component
const CheckoutForm = ({ email, onSuccess, onCancel }: StripePaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [name, setName] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    if (!cardComplete) {
      setError('Please complete your card information');
      return;
    }
    
    if (!name) {
      setError('Please provide your name');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, create a payment intent on your server
      // and return the client secret to the frontend
      
      // 1. Get the current user 
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error('User not authenticated');
      }
      
      // 2. Create a payment method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });
      
      if (stripeError) {
        throw new Error(stripeError.message);
      }
      
      // 3. Call your backend to create a subscription with the payment method
      // This is normally done via your own API endpoint
      // For demo purposes, we'll simulate a successful response
      console.log('Payment method created:', paymentMethod.id);
      
      // 4. Update the user's metadata in Supabase to mark them as subscribed
      await supabase.auth.updateUser({
        data: {
          subscription_status: 'active',
          subscription_plan: 'pro',
          payment_method_id: paymentMethod.id,
        }
      });
      
      // 5. Simulate a delay for the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On success
      onSuccess();
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'There was an error processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} readOnly className="bg-gray-50" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Name on Card</Label>
        <Input 
          id="name" 
          placeholder="Jane Smith" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="rounded-lg border bg-gray-50 p-4">
        <div className="font-medium mb-2">
          MarketAI Pro - $10/month
        </div>
        <ul className="space-y-1 text-sm">
          {[
            "Connect multiple databases",
            "Unlimited queries",
            "Advanced schema visualization",
            "Priority support",
            "30-day data history",
          ].map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card">Card Information</Label>
        <div className="rounded-md border border-gray-200 p-3 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            onChange={(e) => setCardComplete(e.complete)}
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" role="alert">
          {error}
        </div>
      )}
      
      <div className="pt-2">
        <Button type="submit" className="w-full" disabled={loading || !stripe}>
          {loading ? 'Processing...' : 'Start Free Trial'}
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          Your card will not be charged until after your 14-day free trial
        </p>
      </div>
    </form>
  );
};

// Main Stripe Payment component that wraps everything in Elements provider
const StripePayment = (props: StripePaymentProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Registration</CardTitle>
        <CardDescription>
          Enter your payment details to get started with your 14-day free trial.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Elements stripe={stripePromise}>
          <CheckoutForm {...props} />
        </Elements>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="ghost" onClick={props.onCancel} disabled={false}>
          Back
        </Button>
        <div className="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Secure payment
        </div>
      </CardFooter>
    </Card>
  );
};

export default StripePayment;
