'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Leaf className="h-16 w-16 text-primary mb-6 animate-bounce" />
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <h2 className="text-2xl text-muted-foreground mb-8">Oops! The plant you're looking for has withered away.</h2>
      <Button asChild size="lg" className="rounded-full">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
