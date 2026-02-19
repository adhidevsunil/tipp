export type Screen =
  | 'SPLASH'
  | 'WAITER_LIST'
  | 'WAITER_PROFILE'
  | 'PAYMENT_METHOD'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'ERROR'
  | 'ADMIN';

export interface Waiter {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  message: string;
  upiId: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  color?: string;
}

export interface Transaction {
  id: string;
  waiterId: string;
  waiterName: string;
  amount: number;
  timestamp: string;
  method: string;
}
