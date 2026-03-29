import { Waiter, PaymentMethod, Transaction } from './types';
import { GooglePayIcon, PhonePeIcon, PaytmIcon } from './components/ui/PaymentIcons';
import { QrCode } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Initial Mock Data
const INITIAL_WAITERS: Waiter[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Senior Server',
    imageUrl: 'https://images.unsplash.com/photo-1612190219911-286df0e14656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd2FpdGVyJTIwcG9ydHJhaXQlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MTQxOTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    message: 'Always happy to serve with a smile.',
    upiId: 'ambilisunil083@oksbi',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Waitress',
    imageUrl: 'https://images.unsplash.com/photo-1767976517374-3a917cc30dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHdhaXRyZXNzJTIwcG9ydHJhaXQlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MTQxOTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    message: 'Hope you enjoyed your meal!',
    upiId: 'adhidevksunilk@oksbi',
  },
  {
    id: '3',
    name: 'David Lee',
    role: 'Server',
    imageUrl: 'https://images.unsplash.com/photo-1641740634126-7399e808aaa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwd2FpdGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNDE5MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    message: 'Let me know if you need anything else.',
    upiId: 'david@oksbi',
  },
  {
    id: '4',
    name: 'Marco Rossi',
    role: 'Head Waiter',
    imageUrl: 'https://images.unsplash.com/photo-1763590373020-5e3d3352e7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjB3YWl0ZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE0MTkxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    message: 'Thank you for dining with us.',
    upiId: 'marco@okhdfc',
  },
];

// DATA STORAGE KEYS
const STORAGE_KEY_WAITERS = 'tipp_waiters';
const STORAGE_KEY_TRANSACTIONS = 'tipp_transactions';

// --- WAITER MANAGEMENT ---

export const getWaiters = (): Waiter[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_WAITERS);
    if (!stored) {
      // Initialize with mock data if empty
      localStorage.setItem(STORAGE_KEY_WAITERS, JSON.stringify(INITIAL_WAITERS));
      return INITIAL_WAITERS;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse waiters from localStorage", error);
    // If parsing fails, reset to initial data to recover the app
    localStorage.setItem(STORAGE_KEY_WAITERS, JSON.stringify(INITIAL_WAITERS));
    return INITIAL_WAITERS;
  }
};

export const addWaiter = (waiter: Omit<Waiter, 'id'>): Waiter => {
  const waiters = getWaiters();
  const newWaiter = { ...waiter, id: uuidv4() };
  const updatedWaiters = [...waiters, newWaiter];
  localStorage.setItem(STORAGE_KEY_WAITERS, JSON.stringify(updatedWaiters));
  // Dispatch event to update listeners
  window.dispatchEvent(new Event('storage-waiters'));
  return newWaiter;
};

export const updateWaiter = (id: string, updates: Partial<Waiter>) => {
  const waiters = getWaiters();
  const index = waiters.findIndex(w => w.id === id);
  if (index !== -1) {
    waiters[index] = { ...waiters[index], ...updates };
    localStorage.setItem(STORAGE_KEY_WAITERS, JSON.stringify(waiters));
    window.dispatchEvent(new Event('storage-waiters'));
  }
};

export const deleteWaiter = (id: string) => {
  const waiters = getWaiters();
  const updatedWaiters = waiters.filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY_WAITERS, JSON.stringify(updatedWaiters));
  window.dispatchEvent(new Event('storage-waiters'));
};

// --- TRANSACTION MANAGEMENT ---

export const getTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
  return stored ? JSON.parse(stored) : [];
};

export const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
  const transactions = getTransactions();
  const newTransaction: Transaction = {
    ...transaction,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify([...transactions, newTransaction]));
  return newTransaction;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'qrcode',
    name: 'Show QR Code',
    icon: <QrCode className="w-8 h-8" />,
    color: 'bg-white text-gray-800 border-gray-100 hover:bg-gray-50',
  },
  {
    id: 'gpay',
    name: 'Google Pay',
    icon: <GooglePayIcon className="w-8 h-8" />,
    color: 'bg-white text-gray-800 border-gray-100 hover:bg-gray-50',
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: <PhonePeIcon className="w-8 h-8" />,
    color: 'bg-[#5F259F] text-white hover:bg-[#4d1e82]',
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: <PaytmIcon className="w-12 h-8" />, // Paytm logo is wider
    color: 'bg-white text-[#002E6E] border-gray-100 hover:bg-gray-50',
  },
];
