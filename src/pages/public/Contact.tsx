import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-600">Have questions about our AI plans? We're here to help.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-4"
                    >
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <div className="bg-primary-100 p-3 rounded-xl text-primary-600">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Phone</h3>
                                <p className="text-gray-500 text-sm mt-1">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <div className="bg-primary-100 p-3 rounded-xl text-primary-600">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Email</h3>
                                <p className="text-gray-500 text-sm mt-1">support@aiwithurooj.com</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <div className="bg-primary-100 p-3 rounded-xl text-primary-600">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Office</h3>
                                <p className="text-gray-500 text-sm mt-1">Tech Hub, Silicon Valley, CA</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Your Name" placeholder="John Doe" />
                                    <Input label="Email Address" type="email" placeholder="john@example.com" />
                                </div>
                                <Input label="Subject" placeholder="How can we help?" />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 min-h-[150px] p-4"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>
                                <Button size="lg" className="w-full md:w-auto">
                                    Send Message
                                    <Send size={18} className="ml-2" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
