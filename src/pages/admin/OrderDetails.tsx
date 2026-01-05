import { useEffect, useState, useCallback } from 'react';
import type { Order } from '../../types';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, User, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ExtendedOrder extends Order {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profiles: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plans: any;
}

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<ExtendedOrder | null>(null);
    const [loading, setLoading] = useState(true);



    const fetchOrder = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, profiles(*), plans(*), payments(*)')
                .eq('id', id)
                .single();

            if (error) throw error;
            setOrder(data);

            // Debug Log
            console.log("Fetched Order Data:", data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load order');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchOrder();
    }, [id, fetchOrder]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!order) return <div className="p-8 text-center">Order not found</div>;

    return (
        <div className="space-y-6">
            <Link to="/admin/orders">
                <Button variant="ghost" size="sm" icon={ArrowLeft}>Back to Orders</Button>
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-gray-500">Placed on {new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold capitalize 
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><User size={20} className="mr-2" /> Customer Details</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Name</span>
                            <span className="font-medium">{order.profiles?.full_name || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium">{order.profiles?.email || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">WhatsApp</span>
                            <span className="font-medium">{order.profiles?.whatsapp || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">User ID</span>
                            <span className="font-mono text-xs">{order.user_id}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Plan Info */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><Tag size={20} className="mr-2" /> Plan & Payment</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Plan</span>
                            <span className="font-medium text-primary-600">{order.plans?.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Billing Cycle</span>
                            <span className="font-medium capitalize">{order.billing_cycle || 'Monthly'}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Total Amount</span>
                            <span className="font-bold text-lg">${order.total_amount}</span>
                        </div>

                        {/* Payment Details Section */}
                        <div className="pt-2">
                            <span className="text-gray-500 block mb-2">Payment Proof</span>
                            {/* @ts-ignore - Supabase join returns array for 1:Many, but logically 1:1 here usually */}
                            {order.payments && order.payments.length > 0 ? (
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <p><b>TID:</b> {order.payments[0].transaction_id}</p>
                                        <p><b>Method:</b> {order.payments[0].payment_method_id}</p>
                                    </div>
                                    {order.payments[0].screenshot_url && (
                                        <a href={order.payments[0].screenshot_url} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={order.payments[0].screenshot_url}
                                                alt="Payment Screenshot"
                                                className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:opacity-90 transition-opacity"
                                            />
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <span className="text-sm text-gray-400 italic">No payment details found</span>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderDetails;
