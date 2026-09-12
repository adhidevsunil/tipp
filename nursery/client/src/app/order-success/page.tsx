'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass p-8 rounded-3xl text-center space-y-6 animate-slide-up">
        
        <div className="flex justify-center mb-4">
          <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center relative">
             <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
             <CheckCircle className="h-12 w-12 z-10" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your green friends are getting ready for their journey.
        </p>
        
        {orderId && (
          <div className="bg-white/50 border border-gray-100 rounded-2xl p-4 my-6 inline-flex items-center gap-2">
            <span className="text-gray-500 font-medium">Order ID:</span>
            <span className="font-bold tracking-wider">{orderId}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 text-sm">
           <div className="flex flex-col items-center gap-2">
             <Package className="h-5 w-5 text-primary opacity-80" />
             <span className="text-gray-600">Preparing to ship</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Truck className="h-5 w-5 text-primary opacity-80" />
             <span className="text-gray-600">Estimated 3-5 days</span>
           </div>
        </div>

        <div className="pt-6">
           <Link href="/shop">
              <Button size="lg" className="w-full rounded-full h-12">
                 Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           </Link>
        </div>
      </div>
    </div>
  );
}
