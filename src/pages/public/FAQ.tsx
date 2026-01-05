import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function FAQ() {
    const faqs = [
        {
            question: "How do I activate my plan?",
            answer: "After purchasing a plan, your account is automatically updated. If you paid manually, please allow up to 24 hours for verification."
        },
        {
            question: "Can I cancel anytime?",
            answer: "Yes, you can cancel your subscription renewal at any time from your dashboard."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept EasyPaisa, JazzCash, and Nayapay via manual transfer verification."
        },
        {
            question: "Do you offer refunds?",
            answer: "Please check our Refund Policy page for detailed information on refunds."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Frequently Asked Questions</h1>

                    <dl className="mt-12 space-y-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow px-6 py-6">
                                <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                                <dd className="mt-2 text-base text-gray-600">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </main>
            <Footer />
        </div>
    );
}
