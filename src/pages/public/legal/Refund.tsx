import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';

export default function Refund() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Refund Policy</h1>
                    <div className="mt-8 text-lg text-gray-600 space-y-4">
                        <p>We want you to be satisfied with our AI Plans.</p>
                        <h2 className="text-xl font-bold text-gray-900 mt-6">Conditions for Refund</h2>
                        <p>If you are not satisfied with your purchase, you may request a refund within 7 days of purchase, provided that you have not significantly used the service credits.</p>
                        <h2 className="text-xl font-bold text-gray-900 mt-6">Contact Us</h2>
                        <p>If you have any questions about our Returns and Refunds Policy, please contact us.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
