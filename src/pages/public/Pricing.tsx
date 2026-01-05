import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import { Button } from '../../components/ui/Button';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: string;
    features: string[];
    is_popular?: boolean;
    image_url?: string;
}

const Pricing = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const { data, error } = await supabase
                .from('plans')
                .select('*')
                .eq('is_active', true)
                .order('price');

            if (error) throw error;
            setPlans(data || []);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600 uppercase tracking-wide">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-display">
                        Invest in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Productivity</span>
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Choose the perfect AI plan for your needs. Monthly and yearly subscriptions available with instant access.
                    </p>
                </div>

                {loading ? (
                    <div className="mt-16 flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 gap-x-8">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-transform duration-300 hover:scale-105 ${plan.is_popular
                                    ? 'bg-white shadow-2xl border-primary-600 z-10 scale-105'
                                    : 'bg-white/50 border-gray-200 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {plan.is_popular && (
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                                            <Star size={12} fill="currentColor" /> Most Popular
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center justify-between gap-x-4">
                                        <h3 className={`text-xl font-semibold leading-8 ${plan.is_popular ? 'text-primary-600' : 'text-gray-900'}`}>
                                            {plan.name}
                                        </h3>
                                    </div>

                                    {plan.image_url && (
                                        <div className="mt-4 mb-2 overflow-hidden rounded-lg bg-gray-100 border border-gray-100 h-48 flex items-center justify-center">
                                            <img
                                                src={plan.image_url}
                                                alt={plan.name}
                                                className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}

                                    <p className="mt-4 text-sm leading-6 text-gray-600 min-h-[48px]">
                                        {plan.description}
                                    </p>
                                    <p className="mt-6 flex items-baseline gap-x-1">
                                        <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                                        <span className="text-sm font-semibold leading-6 text-gray-600">/{plan.interval}</span>
                                    </p>
                                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                        {plan.features?.map((feature, idx) => (
                                            <li key={idx} className="flex gap-x-3">
                                                <Check className={`h-6 w-5 flex-none ${plan.is_popular ? 'text-primary-600' : 'text-primary-500'}`} aria-hidden="true" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <Link to={`/checkout/${plan.id}`}>
                                        <Button
                                            variant={plan.is_popular ? 'primary' : 'outline'}
                                            className="w-full"
                                            size="lg"
                                        >
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pricing;
