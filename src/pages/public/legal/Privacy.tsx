import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Privacy Policy</h1>
                    <div className="mt-8 text-lg text-gray-600 space-y-4">
                        <p>At AI Plans, accessible from our website, one of our main priorities is the privacy of our visitors.</p>
                        <h2 className="text-xl font-bold text-gray-900 mt-6">Information We Collect</h2>
                        <p>We collect information you provide directly to us when you register for an account, such as your name, email address, and WhatsApp number.</p>
                        <h2 className="text-xl font-bold text-gray-900 mt-6">How We Use Your Information</h2>
                        <p>We use the information we collect to operate, maintain, and provide the features of the services.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
