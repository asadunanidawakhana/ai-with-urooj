import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PlansService } from '../../services/plansService';
import type { Plan } from '../../types';
import { Button } from '../../components/ui/Button';
import { Check, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PlanDetail() {
    const { id } = useParams<{ id: string }>();
    const [plan, setPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(true);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
            console.error('Failed to load plan', error);
            toast.error('Failed to load plan details');
        } finally {
            setLoading(false);
        }
    };

    // Fallback for demo if no DB data
    const mockPlan: Plan | null = id === '1' ? {
        id: '1',
        title: 'Starter',
        description: 'Perfect for beginners exploring AI.',
        price_monthly: 9.99,
        price_yearly: 99.99,
        features: ['Basic AI Access', '50 Credits/Month', 'Standard Support'],
        is_active: true,
        created_at: new Date().toISOString(),
    } : null;

    const displayPlan = plan || mockPlan;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!displayPlan) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Plan not found</h2>
                        <Link to="/pricing" className="mt-4 text-primary-600 hover:text-primary-500">
                            Back to Pricing
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <Link to="/pricing" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Pricing
                    </Link>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{displayPlan.title}</h1>
                            <p className="mt-4 text-lg text-gray-600">{displayPlan.description}</p>

                            <div className="mt-8 border-t border-gray-200 pt-8">
                                <h3 className="text-sm font-medium text-gray-900">Included Features</h3>
                                <ul role="list" className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                                    {displayPlan.features.map((feature, index) => (
                                        <li key={index} className="flex gap-x-3">
                                            <Check className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10 lg:mt-0">
                            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-8">
                                <h2 className="text-lg font-semibold leading-8 text-gray-900">Purchase Summary</h2>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Billing Cycle</span>
                                    <div className="flex rounded-lg bg-gray-100 p-1">
                                        <button
                                            onClick={() => setBillingCycle('monthly')}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                                        >
                                            Monthly
                                        </button>
                                        <button
                                            onClick={() => setBillingCycle('yearly')}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                                        >
                                            Yearly
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-baseline justify-between border-t border-gray-200 pt-6">
                                    <span className="text-base font-medium text-gray-900">Total</span>
                                    <span className="text-3xl font-bold tracking-tight text-gray-900">
                                        ${billingCycle === 'monthly' ? displayPlan.price_monthly : displayPlan.price_yearly}
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <Link to={`/checkout/${displayPlan.id}?cycle=${billingCycle}`}>
                                        <Button className="w-full" size="lg">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>
                                </div>
                                <p className="mt-4 text-center text-xs text-gray-500">
                                    Secure payment via Bank Transfer / Mobile Wallet
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
