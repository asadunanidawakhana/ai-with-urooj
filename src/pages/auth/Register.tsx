import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    whatsapp: z.string().min(10, 'Valid WhatsApp number required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                        phone: data.whatsapp, // Key expected by trigger
                        whatsapp: data.whatsapp, // Backup key
                    },
                },
            });

            if (authError) throw authError;

            if (authData.user) {
                // Profile is created automatically via Supabase Trigger (handle_new_user)
                toast.success('Registration successful! Please check your mailbox and also check spam folder.', { duration: 6000 });
                navigate('/auth/login');
            }
        } catch (error: unknown) {
            toast.error((error as Error).message || 'Registration failed');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Full Name"
                            type="text"
                            {...register('fullName')}
                            error={errors.fullName?.message}
                        />
                        <Input
                            label="WhatsApp Number"
                            type="text"
                            placeholder="+92..."
                            {...register('whatsapp')}
                            error={errors.whatsapp?.message}
                        />
                        <Input
                            label="Email address"
                            type="email"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            type="password"
                            {...register('password')}
                            error={errors.password?.message}
                        />

                        <Button type="submit" className="w-full" isLoading={isSubmitting}>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
