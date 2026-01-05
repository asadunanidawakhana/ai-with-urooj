import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <Link to="/" className="text-xl font-bold font-display text-slate-900 flex items-center gap-2 mb-6">
                            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white p-1.5 rounded-lg shadow-lg shadow-primary-500/20">
                                <Sparkles size={18} />
                            </div>
                            <span>
                                AI With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Urooj</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Empowering content creators and businesses with next-gen AI tools and premium plans. Scale your productivity today.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 transform hover:-translate-y-1"><Facebook size={18} /></a>
                            <a href="#" className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 transform hover:-translate-y-1"><Twitter size={18} /></a>
                            <a href="#" className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 transform hover:-translate-y-1"><Instagram size={18} /></a>
                            <a href="#" className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 transform hover:-translate-y-1"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-6">Product</h3>
                        <ul className="space-y-4">
                            <li><Link to="/pricing" className="text-slate-500 hover:text-primary-600 text-sm transition-colors hover:translate-x-1 inline-block">Pricing Plans</Link></li>
                            <li><Link to="/features" className="text-slate-500 hover:text-primary-600 text-sm transition-colors hover:translate-x-1 inline-block">Features</Link></li>
                            <li><Link to="/about" className="text-slate-500 hover:text-primary-600 text-sm transition-colors hover:translate-x-1 inline-block">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li><Link to="/privacy" className="text-slate-500 hover:text-primary-600 text-sm transition-colors hover:translate-x-1 inline-block">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-slate-500 hover:text-primary-600 text-sm transition-colors hover:translate-x-1 inline-block">Terms of Service</Link></li>
                            <li><Link to="/refund" className="text-slate-500 hover:text-primary-600 text-sm transition-colors hover:translate-x-1 inline-block">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 group">
                                <div className="p-1.5 bg-primary-50 rounded text-primary-600 mt-0.5 group-hover:bg-primary-100 transition-colors">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-slate-500 text-sm leading-relaxed">Tech Hub, Silicon Valley, CA</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <div className="p-1.5 bg-primary-50 rounded text-primary-600 group-hover:bg-primary-100 transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span className="text-slate-500 text-sm">support@aiwithurooj.com</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <div className="p-1.5 bg-primary-50 rounded text-primary-600 group-hover:bg-primary-100 transition-colors">
                                    <Phone size={16} />
                                </div>
                                <span className="text-slate-500 text-sm">+1 (555) 123-4567</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} AI With Urooj. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        {/* Additional links or badges could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};
