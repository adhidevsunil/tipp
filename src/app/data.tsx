import { Waiter, PaymentMethod, Transaction } from './types';
import { QrCode } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Initial Mock Data
const INITIAL_WAITERS: Waiter[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Senior Server',
    imageUrl: '',
    message: 'Always happy to serve with a smile.',
    upiId: 'ambilisunil083@oksbi',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Waitress',
    imageUrl: '',
    message: 'Hope you enjoyed your meal!',
    upiId: 'adhidevksunilk@oksbi',
  },
  {
    id: '3',
    name: 'David Lee',
    role: 'Server',
    imageUrl: '',
    message: 'Let me know if you need anything else.',
    upiId: 'david@oksbi',
  },
  {
    id: '4',
    name: 'Marco Rossi',
    role: 'Head Waiter',
    imageUrl: '',
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
    const parsed: Waiter[] = JSON.parse(stored);
    // Strip image URLs to ensure no old cached photos are displayed
    return parsed.map(w => ({ ...w, imageUrl: '' }));
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
    id: 'upi',
    name: 'UPI Payment',
    icon: <QrCode className="w-8 h-8" />,
    color: 'bg-white text-gray-800 border-gray-100 hover:bg-gray-50',
  },
];
