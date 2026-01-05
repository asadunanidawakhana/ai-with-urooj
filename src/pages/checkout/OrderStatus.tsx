import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { OrderService } from '../../services/orderService';
import type { Order } from '../../types';
import { Button } from '../../components/ui/Button';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderStatus() {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            loadOrder(orderId);
        }
    }, [orderId]);

    const loadOrder = async (id: string) => {
        try {
            const data = await OrderService.getOrderById(id);
            setOrder(data);
        } catch (error) {
            console.error(error); // Log it at least
            toast.error('Failed to load order status');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!order) return <div>Order not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
                <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8 w-full">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        {order.status === 'completed' && (
                            <div className="flex flex-col items-center">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                                <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Approved!</h2>
                                <p className="mt-2 text-gray-600">Your AI plan is active. You can now access all features.</p>
                                <Link to="/user/dashboard" className="mt-8">
                                    <Button className="w-full">Go to Dashboard</Button>
                                </Link>
                            </div>
                        )}
                        {order.status === 'pending' && (
                            <div className="flex flex-col items-center">
                                <Clock className="h-16 w-16 text-yellow-500" />
                                <h2 className="mt-4 text-2xl font-bold text-gray-900">Verification Pending</h2>
                                <p className="mt-2 text-gray-600">We have received your payment details. Admin will verify it shortly (usually within 1-2 hours).</p>
                                <div className="mt-6 bg-yellow-50 p-4 rounded-md text-left w-full">
                                    <p className="text-sm text-yellow-800"><b>Order ID:</b> {order.id}</p>
                                    <p className="text-sm text-yellow-800"><b>Status:</b> Pending Admin Review</p>
                                </div>
                                <Link to="/" className="mt-8">
                                    <Button variant="outline" className="w-full">Return Home</Button>
                                </Link>
                            </div>
                        )}
                        {order.status === 'rejected' && (
                            <div className="flex flex-col items-center">
                                <XCircle className="h-16 w-16 text-red-500" />
                                <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Rejected</h2>
                                <p className="mt-2 text-gray-600">Your payment could not be verified. Please check your dashboard or contact support.</p>
                                <Link to="/contact" className="mt-8">
                                    <Button variant="secondary" className="w-full">Contact Support</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
