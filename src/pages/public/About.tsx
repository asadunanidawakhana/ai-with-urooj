import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">About AI With Urooj</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Democratizing access to advanced artificial intelligence tools for everyone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                At AI With Urooj, we believe that the power of AI shouldn't be limited to big tech companies. Our mission is to provide affordable, high-quality AI plans that empower individuals and small businesses to achieve more.
                            </p>
                            <p className="text-lg text-gray-600">
                                Whether you're a student, specific professional, or creative, our tools are designed to boost your productivity and unlock new possibilities.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="AI Innovation"
                                className="rounded-xl w-full h-auto"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Why We Started</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div>
                                <h3 className="text-xl font-bold text-primary-600 mb-2">Accessibility</h3>
                                <p className="text-gray-600">Making top-tier AI models available at a fraction of the standard cost.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary-600 mb-2">Simplicity</h3>
                                <p className="text-gray-600">User-friendly interfaces that don't require a Ph.D. in computer science to use.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary-600 mb-2">Community</h3>
                                <p className="text-gray-600">Building a supportive community of innovators and creators.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
