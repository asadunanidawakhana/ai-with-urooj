import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Coupon {
    id: string;
    code: string;
    discount_percent: number;
    max_uses: number;
    current_uses: number;
    expires_at: string;
    is_active: boolean;
}

const CouponsManagement = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Coupon>>({
        code: '', discount_percent: 10, max_uses: 100, is_active: true
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setCoupons(data || []);
        } catch {
            toast.error('Failed to load coupons');
        } finally {
            // Loading finished
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('coupons').insert([formData]);
            if (error) throw error;
            toast.success('Coupon created');
            setIsModalOpen(false);
            fetchCoupons();
        } catch {
            toast.error('Failed to create coupon');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this coupon?')) return;
        try {
            const { error } = await supabase.from('coupons').delete().eq('id', id);
            if (error) throw error;
            toast.success('Coupon deleted');
            fetchCoupons();
        } catch {
            toast.error('Failed to delete coupon');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Coupons Management</h1>
                <Button onClick={() => setIsModalOpen(true)} icon={Plus}>Create Coupon</Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className="hover:bg-gray-50 text-sm">
                                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{coupon.code}</td>
                                    <td className="px-6 py-4 text-green-600 font-medium">{coupon.discount_percent}% OFF</td>
                                    <td className="px-6 py-4 text-gray-500">{coupon.current_uses} / {coupon.max_uses}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {coupon.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(coupon.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {coupons.length === 0 && (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No coupons found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold mb-6">Create New Coupon</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <Input label="Coupon Code" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })} required />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Discount %" type="number" value={formData.discount_percent} onChange={e => setFormData({ ...formData, discount_percent: Number(e.target.value) })} required />
                                <Input label="Max Uses" type="number" value={formData.max_uses} onChange={e => setFormData({ ...formData, max_uses: Number(e.target.value) })} required />
                            </div>
                            <Input
                                label="Expires At"
                                type="date"
                                value={formData.expires_at ? formData.expires_at.split('T')[0] : ''}
                                onChange={e => setFormData({ ...formData, expires_at: new Date(e.target.value).toISOString() })}
                            />

                            <div className="flex justify-end gap-3 mt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">Create Coupon</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponsManagement;
