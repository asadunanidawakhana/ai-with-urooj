import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
    LayoutDashboard,
    ShoppingBag,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    CreditCard,
    Users,
    Tag,
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user, profile, signOut } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isAdmin = profile?.role === 'admin';

    const userLinks = [
        { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
        { name: 'My Orders', path: '/user/orders', icon: ShoppingBag },
        { name: 'Profile', path: '/user/profile', icon: User },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
        { name: 'Plans', path: '/admin/plans', icon: CreditCard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Coupons', path: '/admin/coupons', icon: Tag },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10 shadow-sm">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-1 rounded-lg shadow-md hover:shadow-primary-500/20 transition-all">
                            <Sparkles size={16} />
                        </div>
                        <span className="text-lg font-bold font-display text-slate-900">
                            AI With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Urooj</span>
                        </span>
                    </Link>
                </div>
                <div className="flex-1 py-6 flex flex-col justify-between overflow-y-auto">
                    <nav className="px-3 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-primary-50 text-primary-600 shadow-sm font-medium'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon size={20} className={isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'} />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="px-3 mt-auto">
                        <div className="bg-slate-50 rounded-xl p-4 mb-3 border border-slate-100">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-primary-700 font-bold border border-white shadow-sm">
                                    {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold text-slate-900 truncate">{profile?.full_name || 'User'}</p>
                                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black z-20 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 bg-white z-30 md:hidden flex flex-col"
                        >
                            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                                <span className="text-lg font-bold text-gray-900">Menu</span>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <nav className="flex-1 px-4 py-6 space-y-2">
                                {links.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                                ? 'bg-primary-50 text-primary-600'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium">{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                            <div className="px-4 pb-6">
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:pl-64 min-h-screen transition-all duration-300">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden sticky top-0 z-10">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-600">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-gray-900">
                        {links.find(l => l.path === location.pathname)?.name || 'Dashboard'}
                    </span>
                    <div className="w-8" /> {/* Spacer */}
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-7xl mx-auto"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
