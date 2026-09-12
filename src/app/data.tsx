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
    id: 'upi',
    name: 'UPI Payment',
    icon: <QrCode className="w-8 h-8" />,
    color: 'bg-white text-gray-800 border-gray-100 hover:bg-gray-50',
  },
];

// --- VISITOR TRACKING ---

const STORAGE_KEY_VISITS = 'tipp_visits_count';

export const getVisitCount = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_VISITS);
    return stored ? parseInt(stored, 10) : 12; // Start with a realistic baseline
  } catch {
    return 12;
  }
};

export const recordVisit = async (): Promise<number> => {
  const sessionVisited = sessionStorage.getItem('tipp_session_visited');
  let count = getVisitCount();

  if (!sessionVisited) {
    sessionStorage.setItem('tipp_session_visited', 'true');
    count += 1;
    localStorage.setItem(STORAGE_KEY_VISITS, count.toString());

    try {
      const res = await fetch('https://api.counterapi.dev/v1/tippweb_platform/visits/up');
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.count === 'number') {
          count = Math.max(count, data.count);
          localStorage.setItem(STORAGE_KEY_VISITS, count.toString());
        }
      }
    } catch {
      // Offline fallback
    }
  }

  return count;
};

// --- ADMIN SECURITY ---

const STORAGE_KEY_ADMIN_HASH = 'tipp_admin_hash';
// Default SHA-256 hash for 'admin123'
const DEFAULT_ADMIN_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

export const hashPassword = async (pwd: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(pwd);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const verifyAdminPassword = async (inputPwd: string): Promise<boolean> => {
  const storedHash = localStorage.getItem(STORAGE_KEY_ADMIN_HASH) || DEFAULT_ADMIN_HASH;
  const inputHash = await hashPassword(inputPwd);
  return inputHash === storedHash;
};

export const updateAdminPassword = async (newPwd: string): Promise<void> => {
  const newHash = await hashPassword(newPwd);
  localStorage.setItem(STORAGE_KEY_ADMIN_HASH, newHash);
};
