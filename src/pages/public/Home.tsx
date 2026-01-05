import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Zap, Target, Shield, Cpu, MessageSquare, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background min-h-[90vh] flex items-center pt-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/50 via-background to-background z-0" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 font-semibold tracking-wide uppercase text-xs mb-6 max-w-fit">
                                Premium AI Solutions
                            </span>
                            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-tight mb-6 text-slate-900">
                                Unlock the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Artificial Intelligence</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                                Get affordable access to state-of-the-art AI plans. Boost productivity, automate tasks, and generate content with our premium tools.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/auth/register">
                                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-lg shadow-primary-500/20">
                                        Get Started Now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/pricing">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 border-slate-300 text-slate-700 hover:border-primary-600 hover:text-primary-600">
                                        View Plans
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                                <div className="grid gap-6">
                                    <div className="bg-white/10 p-4 rounded-xl flex items-center gap-4">
                                        <div className="p-3 bg-amber-500 rounded-lg"><Cpu size={24} className="text-white" /></div>
                                        <div>
                                            <h3 className="font-bold text-lg">Advanced Models</h3>
                                            <p className="text-sm text-gray-300">Access GPT-4, Claude, and more.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-xl flex items-center gap-4">
                                        <div className="p-3 bg-emerald-500 rounded-lg"><Zap size={24} className="text-white" /></div>
                                        <div>
                                            <h3 className="font-bold text-lg">Instant Processing</h3>
                                            <p className="text-sm text-gray-300">Lightning fast response times.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-xl flex items-center gap-4">
                                        <div className="p-3 bg-blue-500 rounded-lg"><Shield size={24} className="text-white" /></div>
                                        <div>
                                            <h3 className="font-bold text-lg">Secure & Private</h3>
                                            <p className="text-sm text-gray-300">Enterprise-grade data encryption.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Cutting-edge AI at Unbeatable Prices</h2>
                        <p className="text-xl text-gray-500">We make advanced artificial intelligence accessible to everyone. No hidden fees, just raw power.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: 'Smart Generation',
                                description: 'Create content, code, and copy in seconds with our optimized models.',
                                color: 'blue'
                            },
                            {
                                icon: MessageSquare,
                                title: 'Natural Chat',
                                description: 'Engage in human-like conversations for support, brainstorming, and more.',
                                color: 'emerald'
                            },
                            {
                                icon: BarChart,
                                title: 'Data Analysis',
                                description: 'Turn complex data into actionable insights instantly.',
                                color: 'amber'
                            },
                            {
                                icon: Shield,
                                title: 'Secure Infrastructure',
                                description: 'Your data is protected with state-of-the-art encryption.',
                                color: 'purple'
                            },
                            {
                                icon: Zap,
                                title: 'Fast Integration',
                                description: 'API access available for seamless business integration.',
                                color: 'rose'
                            },
                            {
                                icon: Cpu,
                                title: 'Custom Fine-tuning',
                                description: 'Train models on your specific data for better results.',
                                color: 'indigo'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10" />
                <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Supercharge Your Workflow?</h2>
                    <p className="text-xl text-gray-400 mb-10">Join thousands of users who are saving time and money with AI With Urooj.</p>
                    <Link to="/pricing">
                        <Button size="lg" className="text-lg px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white border-none">
                            View Pricing Plans
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
