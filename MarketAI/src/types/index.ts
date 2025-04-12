export interface User {
  id: string;
  email: string;
  user_metadata?: {
    subscription_tier?: 'starter' | 'pro' | 'enterprise';
    subscription_status?: 'active' | 'trialing' | 'past_due' | 'cancelled';
  };
}

export interface QueryResult {
  answer: string;
  query: string;
  explanation: string;
  data?: any;
}

export type AppState = 'landing' | 'auth' | 'payment' | 'app';

export type PlanTier = 'starter' | 'pro' | 'enterprise';

export interface PlanDetails {
  name: string;
  price: string;
  features: string[];
}
