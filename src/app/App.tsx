import React, { useState } from 'react';
import { Screen, Waiter, PaymentMethod } from './types';
import { SplashScreen } from './screens/SplashScreen';
import { WaiterListScreen } from './screens/WaiterListScreen';
import { WaiterProfileScreen } from './screens/WaiterProfileScreen';
import { PaymentMethodScreen } from './screens/PaymentMethodScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { ErrorScreen } from './screens/ErrorScreen';
import { AdminScreen } from './screens/AdminScreen';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [screen, setScreen] = useState<Screen>('SPLASH');
  const [selectedWaiter, setSelectedWaiter] = useState<Waiter | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  React.useEffect(() => {
    // Check if user is trying to access admin panel via URL
    if (window.location.pathname === '/admin') {
      setScreen('ADMIN');
    }
  }, []);

  const handleWaiterSelect = (waiter: Waiter) => {
    setSelectedWaiter(waiter);
    setScreen('WAITER_PROFILE');
  };

  const handleTipProceed = (amount: number) => {
    setTipAmount(amount);
    setScreen('PAYMENT_METHOD');
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    // Skip processing screen as per user request for faster flow
    setScreen('SUCCESS');
  };

  const resetFlow = () => {
    setScreen('WAITER_LIST');
    setSelectedWaiter(null);
    setTipAmount(0);
    setPaymentMethod(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4 sm:p-8">
      {/* Mobile Wrapper - Centered on Desktop */}
      <div className="w-full max-w-md h-[100dvh] bg-background shadow-2xl overflow-hidden relative sm:rounded-[3rem] sm:h-[850px] sm:border-[8px] sm:border-white ring-1 ring-black/5 mx-auto">
        <AnimatePresence mode="wait">
          {screen === 'SPLASH' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <SplashScreen
                onNext={() => setScreen('WAITER_LIST')}
              />
            </motion.div>
          )}

          {screen === 'WAITER_LIST' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <WaiterListScreen onSelect={handleWaiterSelect} />
            </motion.div>
          )}

          {screen === 'WAITER_PROFILE' && selectedWaiter && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <WaiterProfileScreen
                waiter={selectedWaiter}
                initialAmount={tipAmount}
                onBack={() => setScreen('WAITER_LIST')}
                onProceed={handleTipProceed}
              />
            </motion.div>
          )}

          {screen === 'PAYMENT_METHOD' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <PaymentMethodScreen
                amount={tipAmount}
                waiter={selectedWaiter!}
                onBack={() => setScreen('WAITER_PROFILE')}
                onPay={handlePaymentSelect}
              />
            </motion.div>
          )}

          {screen === 'SUCCESS' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <SuccessScreen
                waiterName={selectedWaiter?.name || 'Wait Staff'}
                onDone={resetFlow}
              />
            </motion.div>
          )}

          {screen === 'ERROR' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <ErrorScreen
                onRetry={() => setScreen('PAYMENT_METHOD')}
                onCancel={() => setScreen('WAITER_LIST')}
              />
            </motion.div>
          )}

          {screen === 'ADMIN' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full w-full"
            >
              <AdminScreen
                onBack={() => setScreen('WAITER_LIST')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
