import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../supabase/client';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';
import { User, Lock, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, profile } = useAuthStore();
    const [loading, setLoading] = useState(false);

    // Profile State
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    // Password State
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
            setPhone(profile.phone || '');
        }
    }, [profile]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName, phone: phone })
                .eq('id', user?.id);

            if (error) throw error;
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            toast.success('Password updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch {
            toast.error('Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                            <User size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Your Name"
                            />
                            <Input
                                label="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1234567890"
                            />
                        </div>
                        <Input
                            label="Email Address"
                            value={user?.email || ''}
                            disabled
                            className="bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </motion.div>

                {/* Password Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                            <Lock size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                        <Input
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repeat password"
                        />
                        <Button type="submit" variant="outline" className="w-full" disabled={loading || !password}>
                            Update Password
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
