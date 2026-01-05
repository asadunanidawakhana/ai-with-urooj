import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';

export default function Terms() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Terms and Conditions</h1>
                    <div className="mt-8 text-lg text-gray-600 space-y-4">
                        <p>Welcome to AI Plans. By accessing this website we assume you accept these terms and conditions.</p>
                        <h2 className="text-xl font-bold text-gray-900 mt-6">1. License</h2>
                        <p>Unless otherwise stated, AI Plans and/or its licensors own the intellectual property rights for all material on AI Plans. All intellectual property rights are reserved.</p>
                        <h2 className="text-xl font-bold text-gray-900 mt-6">2. User Account</h2>
                        <p>If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
