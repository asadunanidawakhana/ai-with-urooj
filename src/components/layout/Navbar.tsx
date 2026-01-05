
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import { Menu, X, User, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../../assets/logo.png';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const isAuthPage = location.pathname.startsWith('/auth');

    if (isAuthPage) return null;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2 group">
                        <img src={logo} alt="AI With Urooj" className="h-12 w-auto object-contain" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-all duration-200 hover:text-primary-600 relative group ${location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <Link to={profile?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
                                    <Button variant="ghost" className="flex items-center font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">
                                        <User size={18} className="mr-2" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={handleSignOut} size="sm" className="border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                                    <LogOut size={18} />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to="/auth/login">
                                    <Button variant="ghost" className="text-slate-600 hover:text-primary-600 font-medium">Sign In</Button>
                                </Link>
                                <Link to="/auth/register">
                                    <Button className="font-semibold shadow-lg shadow-primary-500/25">
                                        Get Started <ChevronRight size={16} className="ml-1" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-primary-600 transition-colors focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${location.pathname === link.path ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-slate-100 space-y-3 px-2">
                                {user ? (
                                    <>
                                        <Link to={profile?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full justify-center py-6 text-lg shadow-lg shadow-primary-500/20">
                                                <User size={20} className="mr-2" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Button variant="outline" onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} className="w-full justify-center py-6 text-lg border-slate-200">
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-center py-4 text-base font-medium text-slate-600">Sign In</Button>
                                        </Link>
                                        <Link to="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full justify-center py-4 text-base font-semibold shadow-lg shadow-primary-500/20">Get Started</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
