'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldAlert, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const setAdminInfo = useUserStore((state) => state.setAdminInfo);
  const adminInfo = useUserStore((state) => state.adminInfo);
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (adminInfo) {
      router.push('/admin/dashboard');
    }
  }, [adminInfo, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { username, password });
      setAdminInfo(res.data);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-md w-full glass p-8 rounded-3xl animate-fade-in relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex justify-center mb-6">
           <Link href="/" className="inline-flex items-center justify-center h-16 w-16 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 mx-auto">
              <Leaf className="h-8 w-8" />
           </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">Admin Portal</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Sign in to manage inventory & orders.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 mb-6 text-sm border border-red-100 animate-slide-up">
             <ShieldAlert className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <Input 
              type="text" 
              placeholder="admin" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-lg mt-2"
            isLoading={loading}
          >
            Authenticate
          </Button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          Secure Area. Unauthorized access prohibited.
        </div>
      </div>
    </div>
  );
}
