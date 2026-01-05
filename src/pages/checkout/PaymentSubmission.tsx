import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { OrderService } from '../../services/orderService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FileUpload } from '../../components/ui/FileUpload';
import toast from 'react-hot-toast';
import type { PaymentMethod } from '../../types';

export default function PaymentSubmission() {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [tid, setTid] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) return;
        const init = async () => {
            try {
                // Verify order exists
                await OrderService.getOrderById(orderId);
                // Fetch valid payment methods
                const methodsData = await OrderService.getActivePaymentMethods();
                setMethods(methodsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Invalid Order ID or permissions error.');
                navigate('/user/dashboard');
            }
        };
        init();
    }, [orderId, navigate]);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId || !tid || !selectedMethod || !file) {
            toast.error('Please fill all fields and upload a screenshot');
            return;
        }

        setIsSubmitting(true);
        try {
            // Upload screenshot
            const imageUrl = await OrderService.uploadScreenshot(file);

            // Create payment record
            await OrderService.submitPayment(orderId, selectedMethod, tid, imageUrl);

            toast.success('Payment submitted for verification!');
            navigate(`/checkout/status/${orderId}`);
        } catch (error: any) {
            console.error(error);
            toast.error('Submission failed: ' + (error.message || 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Verify Payment</h1>
                    <div className="mt-8 bg-white rounded-lg shadow px-6 py-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method Used</label>
                                <select
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                    value={selectedMethod}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                >
                                    <option value="">Select Method</option>
                                    {methods.map((method) => (
                                        <option key={method.id} value={method.id}>
                                            {method.method_name} - {method.account_number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                label="Transaction ID (TID)"
                                placeholder="e.g. 123456789"
                                value={tid}
                                onChange={(e) => setTid(e.target.value)}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Screenshot</label>
                                <FileUpload onFileSelect={handleFileSelect} label={file ? "Change Screenshot" : "Upload Screenshot"} />
                                {preview && (
                                    <div className="mt-4">
                                        <img src={preview} alt="Preview" className="h-48 w-full object-cover rounded-md border border-gray-200" />
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full" isLoading={isSubmitting}>
                                Submit Verification
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
