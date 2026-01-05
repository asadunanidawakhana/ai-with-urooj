import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function EmailVerification() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md text-center">
                <div className="mb-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <svg
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Check your email</h2>
                <p className="mt-2 text-sm text-gray-600">
                    We sent you a verification link. Please check your email to verify your account and log in.
                </p>
                <div className="mt-6">
                    <Link to="/auth/login">
                        <Button variant="primary" className="w-full">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
