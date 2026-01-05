import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Lock, Bell, User, Save } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="max-w-4xl space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>

            {/* General Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                        <User size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Platform Name" defaultValue="AI With Urooj" />
                    <Input label="Support Email" defaultValue="support@aiwithurooj.com" />
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                        <Bell size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                </div>
                <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="text-gray-700">Email alerts for new orders</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="text-gray-700">Email alerts for system updates</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="text-gray-700">Daily summary report</span>
                    </label>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                        <Lock size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                </div>
                <div className="space-y-4">
                    <Button variant="outline">Change Admin Password</Button>
                    <Button variant="outline" className="ml-4">Manage API Keys</Button>
                </div>
            </div>

            <div className="flex justify-end">
                <Button size="lg">
                    <Save className="mr-2 h-5 w-5" />
                    Save All Changes
                </Button>
            </div>
        </div>
    );
};

export default AdminSettings;
