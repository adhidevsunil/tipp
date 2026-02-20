import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Waiter, PaymentMethod } from '../types';
import { paymentMethods, addTransaction } from '../data';

interface PaymentMethodScreenProps {
  amount: number;
  waiter: Waiter;
  onBack: () => void;
  onPay: (method: PaymentMethod) => void;
}

export const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({ amount, waiter, onBack, onPay }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedMethod(id);
  };

  const handlePay = () => {
    if (selectedMethod) {
      const method = paymentMethods.find(m => m.id === selectedMethod);
      if (method) {
        // Generate a unique transaction reference for tracking
        const transactionRef = `TZ${Date.now()}`;
        // Format amount with exactly 2 decimal places to prevent parsing bugs in UPI apps
        const formattedAmount = amount.toFixed(2);

        // Base params with tr, strict am, and fallback metadata to bypass GPay P2P intent blocks
        const params = `pa=${waiter.upiId}&pn=${encodeURIComponent(waiter.name)}&tr=${transactionRef}&am=${formattedAmount}&cu=INR&mc=0000&mode=02&purpose=00`;

        let upiLink = `upi://pay?${params}`;

        // iOS/Android specific schemes to prevent defaulting to wrong app (like WhatsApp)
        if (selectedMethod === 'gpay') {
          upiLink = `gpay://upi/pay?${params}`;
        } else if (selectedMethod === 'phonepe') {
          upiLink = `phonepe://pay?${params}`;
        } else if (selectedMethod === 'paytm') {
          upiLink = `paytmmp://pay?${params}`;
        }

        // Fallback for generic UPI if needed, but specific schemes appear to be what's requested
        // to avoid the "WhatsApp redirect" issue on iOS.

        // Open UPI app
        window.location.href = upiLink;

        // Show confirmation dialog instead of auto-proceeding
        setShowConfirmation(true);
      }
    }
  };



  // ... inside component ...

  const handleConfirmed = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (method) {
      // Log the transaction
      addTransaction({
        waiterId: waiter.id,
        waiterName: waiter.name,
        amount: amount,
        method: method.name,
      });

      onPay(method);
    }
  };

  if (showConfirmation) {
    return (
      <div className="flex flex-col h-full bg-background px-6 justify-center items-center text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <div className="w-12 h-12 bg-primary rounded-full" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
        <p className="text-muted-foreground mb-8">
          Please complete the payment in your UPI app. Once done, confirm below.
        </p>

        <Button
          fullWidth
          size="lg"
          onClick={handleConfirmed}
          className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          I have paid ₹{amount}
        </Button>

        <Button
          fullWidth
          variant="outline"
          onClick={() => setShowConfirmation(false)}
          className="border-border text-foreground hover:bg-muted"
        >
          Cancel / Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground relative overflow-hidden">
      {/* Decorative gradient blob - Subtle and clean */}
      <div className="absolute top-0 right-0 w-full h-64 bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col z-10 px-6 pt-6 pb-2">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">Checkout</h1>
        </div>

        {/* Amount Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden mb-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full pointer-events-none" />
          <div className="relative z-10">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block mb-1">Total Amount</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-light text-primary mr-1">₹</span>
              <span className="text-4xl font-bold text-foreground">{amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-4 z-10">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 pl-1">Select Payment Method</h2>

        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(method.id)}
            className={`
              relative p-4 rounded-2xl border flex items-center space-x-4 cursor-pointer transition-all duration-300
              ${selectedMethod === method.id
                ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary'
                : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30 shadow-sm'}
            `}
          >
            <div className={`
              p-3 rounded-xl flex items-center justify-center w-12 h-12 shadow-sm
              ${selectedMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-white border border-border text-muted-foreground'}
            `}>
              {method.icon}
            </div>

            <div className="flex-1">
              <h3 className={`font-semibold ${selectedMethod === method.id ? 'text-primary' : 'text-foreground'}`}>
                {method.name}
              </h3>
              <p className="text-xs text-muted-foreground">Tap to pay</p>
            </div>

            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${selectedMethod === method.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-transparent'}
            `}>
              {selectedMethod === method.id && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Button - Fixed Bottom */}
      <div className="p-6 bg-background/90 backdrop-blur-md border-t border-border z-20 pb-8">
        <Button
          fullWidth
          size="lg"
          disabled={!selectedMethod}
          onClick={handlePay}
          className="h-16 text-xl font-bold shadow-xl shadow-primary/20 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground transform active:scale-[0.98] transition-all"
        >
          Pay Securely
        </Button>
      </div>
    </div>
  );
};
