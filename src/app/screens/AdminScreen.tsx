import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waiter, Transaction } from '../types';
import { getWaiters, addWaiter, updateWaiter, deleteWaiter, getTransactions } from '../data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Trash2, Edit, Plus, Download, LogOut, Save, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

interface AdminScreenProps {
    onBack: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ onBack }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [waiters, setWaiters] = useState<Waiter[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newWaiter, setNewWaiter] = useState<Partial<Waiter>>({});
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadWaiters();
        }
    }, [isAuthenticated]);

    const loadWaiters = () => {
        setWaiters(getWaiters());
    };

    const handleLogin = () => {
        if (password === 'admin123') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    const handleSave = () => {
        if (newWaiter.name && newWaiter.upiId) {
            if (editingId) {
                updateWaiter(editingId, newWaiter);
            } else {
                addWaiter({
                    name: newWaiter.name!,
                    role: newWaiter.role || 'Server',
                    imageUrl: newWaiter.imageUrl || '',
                    message: newWaiter.message || 'Happy to serve!',
                    upiId: newWaiter.upiId!,
                });
            }
            loadWaiters();
            setEditingId(null);
            setIsAdding(false);
            setNewWaiter({});
        }
    };

    const handleEdit = (waiter: Waiter) => {
        setNewWaiter(waiter);
        setEditingId(waiter.id);
        setIsAdding(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this waiter?')) {
            deleteWaiter(id);
            loadWaiters();
        }
    };

    const downloadTransactions = () => {
        const transactions = getTransactions();
        const headers = ['ID', 'Waiter Name', 'Amount', 'Method', 'Date'];
        const csvContent = [
            headers.join(','),
            ...transactions.map(t =>
                [t.id, t.waiterName, t.amount, t.method, new Date(t.timestamp).toLocaleString()].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tips_transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6">
                <Card className="w-full max-w-sm p-6 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Admin Login</h1>
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button onClick={handleLogin} className="w-full">Login</Button>
                    <Button variant="outline" onClick={() => window.location.href = '/'} className="w-full">Back to App</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
            <header className="bg-white p-4 shadow-sm flex justify-between items-center z-10">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={downloadTransactions} title="Export CSV">
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Waiters</h2>
                    <Button size="sm" onClick={() => { setIsAdding(true); setNewWaiter({}); setEditingId(null); }}>
                        <Plus className="w-4 h-4 mr-1" /> Add New
                    </Button>
                </div>

                {isAdding && (
                    <Card className="p-4 space-y-3 bg-white border-2 border-primary/20">
                        <h3 className="font-semibold">{editingId ? 'Edit Waiter' : 'Add New Waiter'}</h3>
                        <Input
                            placeholder="Name"
                            value={newWaiter.name || ''}
                            onChange={e => setNewWaiter({ ...newWaiter, name: e.target.value })}
                        />
                        <Input
                            placeholder="Role (e.g. Senior Server)"
                            value={newWaiter.role || ''}
                            onChange={e => setNewWaiter({ ...newWaiter, role: e.target.value })}
                        />
                        <Input
                            placeholder="UPI ID (Important!)"
                            value={newWaiter.upiId || ''}
                            onChange={e => setNewWaiter({ ...newWaiter, upiId: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL (Optional)"
                            value={newWaiter.imageUrl || ''}
                            onChange={e => setNewWaiter({ ...newWaiter, imageUrl: e.target.value })}
                        />
                        <div className="flex gap-2 mt-2">
                            <Button onClick={handleSave} className="flex-1">
                                <Save className="w-4 h-4 mr-2" /> Save
                            </Button>
                            <Button variant="outline" onClick={() => setIsAdding(false)} className="flex-1">
                                <X className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                        </div>
                    </Card>
                )}

                <div className="space-y-3">
                    {waiters.map(waiter => (
                        <Card key={waiter.id} className="p-3 flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={waiter.imageUrl} />
                                <AvatarFallback>{waiter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <h3 className="font-semibold truncate">{waiter.name}</h3>
                                <p className="text-xs text-muted-foreground truncate">{waiter.role} • {waiter.upiId}</p>
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(waiter)}>
                                    <Edit className="w-4 h-4 text-blue-500" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(waiter.id)}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
