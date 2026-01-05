import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { OrderService } from '../../services/orderService';
import type { Order, PaymentMethod } from '../../types';
import { Button } from '../../components/ui/Button';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Payment() {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            loadData(orderId);
        }
    }, [orderId]);

    const loadData = async (id: string) => {
        try {
            const [orderData, methodsData] = await Promise.all([
                OrderService.getOrderById(id),
                OrderService.getActivePaymentMethods()
            ]);
            setOrder(orderData);
            setMethods(methodsData);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load payment details');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    if (loading) return <div>Loading...</div>;
    if (!order) return <div>Order not found</div>;

    // Mock methods if none in DB yet for demo
    const displayMethods = methods.length > 0 ? methods : [
        { id: '1', method_name: 'EasyPaisa', account_number: '03224602119', account_name: 'Urooj Fatima', is_active: true, instructions: '' },
        { id: '2', method_name: 'JazzCash', account_number: '03224602119', account_name: 'Urooj Fatima', is_active: true, instructions: '' },
        { id: '3', method_name: 'Nayapay', account_number: '03224602119', account_name: 'Urooj Fatima', is_active: true, instructions: '' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Make Payment</h1>
                    <p className="mt-2 text-gray-600">Please send <b>${order.total_amount?.toFixed(2)}</b> (Approx PKR {(order.total_amount * 280).toFixed(0)}) to one of the accounts below.</p>

                    <div className="mt-8 space-y-6">
                        {displayMethods.map((method) => (
                            <div key={method.id} className="bg-white rounded-lg shadow p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-primary-700">{method.method_name}</h3>
                                <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                    <div>
                                        <p className="text-sm text-gray-500">Account Number</p>
                                        <p className="text-lg font-mono font-medium text-gray-900">{method.account_number}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(method.account_number)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="mt-2 flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                    <div>
                                        <p className="text-sm text-gray-500">Account Title</p>
                                        <p className="text-base font-medium text-gray-900">{method.account_name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-blue-50 p-4 rounded-md">
                        <p className="text-sm text-blue-800">
                            After creating the payment, please take a a screenshot and save the Transaction ID. You will need them to verify your payment.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Link to={`/checkout/submit/${order.id}`}>
                            <Button className="w-full" size="lg">I Have Made the Payment</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
