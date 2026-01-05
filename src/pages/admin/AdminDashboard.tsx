import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { motion } from 'framer-motion';
import {
    Users,
    ShoppingBag,
    CreditCard,
    DollarSign,
    ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalUsers: 0,
        activePlans: 0
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch total revenue (sum of completed orders)
                const { data: revenueData } = await supabase
                    .from('orders')
                    .select('total_amount')
                    .eq('status', 'completed');

                const totalRevenue = revenueData?.reduce((acc, curr) => acc + curr.total_amount, 0) || 0;

                // Fetch counts
                const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
                const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
                const { count: plansCount } = await supabase.from('plans').select('*', { count: 'exact', head: true }).eq('is_active', true);

                setStats({
                    totalRevenue,
                    totalOrders: ordersCount || 0,
                    totalUsers: usersCount || 0,
                    activePlans: plansCount || 0
                });

                // Fetch recent orders
                const { data: recent } = await supabase
                    .from('orders')
                    .select('*, profiles(full_name)')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setRecentOrders(recent || []);

            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        fetchStats();
    }, []);



    const statCards = [
        { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-green-500', trend: '+12.5%' },
        { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-500', trend: '+5.2%' },
        { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-500', trend: '+2.4%' },
        { title: 'Active Plans', value: stats.activePlans, icon: CreditCard, color: 'bg-orange-500', trend: 'Stable' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                <stat.icon size={24} className={`text-${stat.color.replace('bg-', '')}`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-600 flex items-center font-medium">
                                <ArrowUpRight size={16} className="mr-1" />
                                {stat.trend}
                            </span>
                            <span className="text-gray-400 ml-2">vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                        <Link to="/admin/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{order.profiles?.full_name || 'Unknown'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${order.total_amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium 
                                                ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        <Link to="/admin/plans">
                            <button className="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all group">
                                <CreditCard className="text-gray-400 group-hover:text-primary-600 mr-4" />
                                <div className="text-left">
                                    <h4 className="font-medium text-gray-900">Manage Plans</h4>
                                    <p className="text-sm text-gray-500">Update pricing or features</p>
                                </div>
                            </button>
                        </Link>
                        <Link to="/admin/users">
                            <button className="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all group">
                                <Users className="text-gray-400 group-hover:text-primary-600 mr-4" />
                                <div className="text-left">
                                    <h4 className="font-medium text-gray-900">View Users</h4>
                                    <p className="text-sm text-gray-500">Manage customer accounts</p>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
