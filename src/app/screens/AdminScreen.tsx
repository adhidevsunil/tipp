import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waiter, Transaction } from '../types';
import { getWaiters, addWaiter, updateWaiter, deleteWaiter, getTransactions, getVisitCount, recordVisit, verifyAdminPassword, updateAdminPassword } from '../data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Trash2, Edit, Plus, Download, LogOut, Save, X, User, Eye, Users, TrendingUp, KeyRound, ShieldCheck, Lock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

interface AdminScreenProps {
    onBack: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ onBack }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return sessionStorage.getItem('tipp_admin_session') === 'true';
    });
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [failedAttempts, setFailedAttempts] = useState<number>(0);
    const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

    // Change Password Modal
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [pwdMsg, setPwdMsg] = useState('');

    const [waiters, setWaiters] = useState<Waiter[]>([]);
    const [visitCount, setVisitCount] = useState<number>(getVisitCount());
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newWaiter, setNewWaiter] = useState<Partial<Waiter>>({});
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadWaiters();
            loadAnalytics();
        }
    }, [isAuthenticated]);

    // Handle lockout countdown
    useEffect(() => {
        let timer: any;
        if (lockoutRemaining > 0) {
            timer = setInterval(() => {
                setLockoutRemaining(prev => Math.max(0, prev - 1));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [lockoutRemaining]);

    const loadWaiters = () => {
        setWaiters(getWaiters());
    };

    const loadAnalytics = async () => {
        setTransactions(getTransactions());
        const count = await recordVisit();
        setVisitCount(count);
    };

    const handleLogin = async () => {
        if (lockoutRemaining > 0) return;

        const isValid = await verifyAdminPassword(password);
        if (isValid) {
            setIsAuthenticated(true);
            sessionStorage.setItem('tipp_admin_session', 'true');
            setError('');
            setFailedAttempts(0);
            setPassword('');
        } else {
            const nextAttempts = failedAttempts + 1;
            setFailedAttempts(nextAttempts);
            if (nextAttempts >= 5) {
                setLockoutRemaining(300); // 5 minutes lockout
                setError('Too many failed attempts. Locked for 5 minutes.');
            } else {
                setError(`Incorrect password. ${5 - nextAttempts} attempts remaining.`);
            }
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('tipp_admin_session');
        setIsAuthenticated(false);
    };

    const handleChangePassword = async () => {
        if (!newPwd || newPwd.length < 6) {
            setPwdMsg('Password must be at least 6 characters.');
            return;
        }
        if (newPwd !== confirmPwd) {
            setPwdMsg('Passwords do not match.');
            return;
        }
        await updateAdminPassword(newPwd);
        setPwdMsg('Password updated successfully!');
        setTimeout(() => {
            setShowChangePwd(false);
            setNewPwd('');
            setConfirmPwd('');
            setPwdMsg('');
        }, 1500);
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
            <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-100">
                <Card className="w-full max-w-sm p-6 space-y-4 bg-white shadow-xl border border-slate-200">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold">Secure Admin Access</h1>
                        <p className="text-xs text-muted-foreground">Protected management portal</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            disabled={lockoutRemaining > 0}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-center"
                        />
                        {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}
                        {lockoutRemaining > 0 && (
                            <p className="text-amber-600 text-xs text-center font-bold">
                                Try again in {Math.floor(lockoutRemaining / 60)}m {lockoutRemaining % 60}s
                            </p>
                        )}
                        <Button type="submit" disabled={lockoutRemaining > 0} className="w-full h-11">
                            Verify & Enter
                        </Button>
                    </form>
                    <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'} className="w-full text-xs">
                        Back to Home
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-50 overflow-hidden relative">
            {showChangePwd && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-sm p-6 space-y-4 bg-white shadow-xl">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Change Admin Password</h3>
                            <Button variant="ghost" size="sm" onClick={() => setShowChangePwd(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <Input
                            type="password"
                            placeholder="New Password (min 6 chars)"
                            value={newPwd}
                            onChange={(e) => setNewPwd(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                        {pwdMsg && <p className={`text-xs text-center font-medium ${pwdMsg.includes('success') ? 'text-emerald-600' : 'text-red-500'}`}>{pwdMsg}</p>}
                        <div className="flex gap-2 pt-2">
                            <Button onClick={handleChangePassword} className="flex-1">
                                Update Password
                            </Button>
                            <Button variant="outline" onClick={() => setShowChangePwd(false)} className="flex-1">
                                Cancel
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            <header className="bg-white p-4 shadow-sm flex justify-between items-center z-10">
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowChangePwd(true)} title="Change Password">
                        <KeyRound className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadTransactions} title="Export CSV">
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout} title="Logout">
                        <LogOut className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Analytics & Visitor Stats */}
                <div className="grid grid-cols-3 gap-2">
                    <Card className="p-3 bg-white border border-primary/20 flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mb-1">
                            <Eye className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold text-foreground">{visitCount}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium">Website Visits</span>
                    </Card>

                    <Card className="p-3 bg-white border border-border flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="p-2 rounded-full bg-emerald-50 text-emerald-600 mb-1">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold text-foreground">{transactions.length}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium">Tips Received</span>
                    </Card>

                    <Card className="p-3 bg-white border border-border flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="p-2 rounded-full bg-blue-50 text-blue-600 mb-1">
                            <Users className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold text-foreground">{waiters.length}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium">Active Staff</span>
                    </Card>
                </div>

                <div className="flex justify-between items-center pt-2">
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
                            <Avatar className="w-10 h-10">
                                {waiter.imageUrl ? <AvatarImage src={waiter.imageUrl} alt={waiter.name} /> : null}
                                <AvatarFallback className="bg-slate-200">
                                    <User className="w-5 h-5 text-slate-400" />
                                </AvatarFallback>
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
