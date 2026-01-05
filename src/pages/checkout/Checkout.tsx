import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PlansService } from '../../services/plansService';
import { OrderService } from '../../services/orderService';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export default function Checkout() {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    // Billing cycle is less relevant now if plan has fixed price, but keeping for legacy url support
    const billingCycle = searchParams.get('cycle') || 'monthly';

    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            loadPlan(id);
        }
    }, [id]);

    const loadPlan = async (planId: string) => {
        try {
            const data = await PlansService.getPlanById(planId);
            setPlan(data);
        } catch (error) {
            console.error(error);
            toast.error("Could not load plan");
        } finally {
            setLoading(false);
        }
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        try {
            const coupon = await OrderService.validateCoupon(couponCode);
            if (coupon) {
                let discountAmount = 0;
                // Plan price is now just 'price'
                const originalPrice = plan?.price || 0;

                if (coupon.discount_percent) {
                    discountAmount = (originalPrice * coupon.discount_percent) / 100;
                } else if (coupon.discount_value) {
                    // Fallback if schema uses value
                    discountAmount = coupon.discount_value;
                }

                setDiscount(discountAmount);
                toast.success('Coupon applied!');
            }
        } catch {
            toast.error('Invalid or expired coupon');
            setDiscount(0);
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            toast.error('Please log in to continue');
            navigate('/auth/login', { state: { from: `/checkout/${id}?cycle=${billingCycle}` } });
            return;
        }
        if (!plan) return;

        setIsSubmitting(true);
        try {
            const originalPrice = plan.price;
            const finalPrice = Math.max(0, originalPrice - discount);

            const order = await OrderService.createOrder(plan.id, user.id, finalPrice);
            navigate(`/checkout/payment/${order.id}`);
        } catch (error: any) {
            toast.error('Failed to create order: ' + (error.message || 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!plan) return <div className="min-h-screen flex items-center justify-center">Plan not found</div>;

    const price = plan.price || 0;
    const total = Math.max(0, price - discount);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-8">
                            <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
                            <div className="mt-6 flex justify-between text-base font-medium text-gray-900">
                                <p>{plan.name || plan.title} ({plan.interval || 'month'})</p>
                                <p>${Number(price).toFixed(2)}</p>
                            </div>
                            {discount > 0 && (
                                <div className="mt-2 flex justify-between text-sm font-medium text-green-600">
                                    <p>Discount</p>
                                    <p>-${discount.toFixed(2)}</p>
                                </div>
                            )}
                            <div className="mt-6 flex justify-between text-xl font-bold text-gray-900 border-t pt-4">
                                <p>Total</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-6">
                            <div className="flex space-x-4">
                                <Input
                                    placeholder="Coupon Code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <Button variant="secondary" onClick={handleApplyCoupon}>Apply</Button>
                            </div>
                        </div>
                        <div className="px-6 py-6">
                            <Button className="w-full" size="lg" onClick={handleCheckout} isLoading={isSubmitting}>
                                Proceed to Payment
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
