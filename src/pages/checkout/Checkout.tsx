import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PlansService } from '../../services/plansService';
import { OrderService } from '../../services/orderService';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';
import { MessageCircle } from 'lucide-react';

export default function Checkout() {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
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

    const handleWhatsAppCheckout = async () => {
        if (!user) {
            toast.error('Please log in to continue');
            // Allow them to see the button but maybe prompt login if they click? 
            // The requirement didn't explicitly say force login for whatsapp but it's better for tracking.
            // But client said "user planke niche Get plan par clieck kare..." so maybe they are already on this page.
            // If they are not logged in, we can't create an order easily linked to them. 
            // I will enforce login for now as per previous logic.
            window.location.href = `/auth/login?from=/checkout/${id}?cycle=${billingCycle}`;
            return;
        }
        if (!plan) return;

        setIsSubmitting(true);
        try {
            const originalPrice = plan.price;
            const finalPrice = Math.max(0, originalPrice - discount);

            // Create order first to track it
            const order = await OrderService.createOrder(plan.id, user.id, finalPrice);

            // Construct WhatsApp Message
            const phoneNumber = "923224602119";
            const text = `I am interested to buy this plan
Plan: ${plan.name}
Price: ${finalPrice.toFixed(2)}
Order ID: ${order.id}
User Email: ${user.email}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            toast.success('Redirecting to WhatsApp...');

        } catch (error: any) {
            toast.error('Failed to process request: ' + (error.message || 'Unknown error'));
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
                    <h1 className="text-3xl font-bold text-gray-900 border-b pb-4 mb-8">Complete Your Purchase</h1>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 bg-gradient-to-r from-gray-50 to-white">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Summary</h3>
                            <p className="text-gray-500">Review your plan details below</p>

                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between items-center text-lg text-gray-700">
                                    <span>{plan.name} <span className="text-sm text-gray-500">({plan.interval || 'month'})</span></span>
                                    <span className="font-medium">${Number(price).toFixed(2)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between items-center text-green-600 bg-green-50 p-3 rounded-lg">
                                        <span className="flex items-center gap-2"><span className="text-xs bg-green-200 px-2 py-0.5 rounded-full">Applied</span> Discount</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-gray-200 mt-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-900 font-bold text-xl">Total</span>
                                        <div className="text-right">
                                            {discount > 0 && <span className="block text-sm text-gray-400 line-through">${Number(price).toFixed(2)}</span>}
                                            <span className="text-3xl font-extrabold text-primary-600">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white space-y-8">
                            {/* Coupon Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Have a coupon code?</label>
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="Enter code here"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button variant="secondary" onClick={handleApplyCoupon} disabled={!couponCode}>
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            {/* WhatsApp Button */}
                            <Button
                                className="w-full h-14 text-lg font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all"
                                onClick={handleWhatsAppCheckout}
                                isLoading={isSubmitting}
                            >
                                <MessageCircle className="mr-2 h-6 w-6" />
                                Buy via WhatsApp
                            </Button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                Clicking above will open WhatsApp with your order details pre-filled.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
