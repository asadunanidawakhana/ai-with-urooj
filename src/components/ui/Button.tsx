import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, icon: Icon, children, ...props }, ref) => {

        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg border-transparent',
            secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg border-transparent',
            outline: 'bg-transparent border-primary-600 text-primary-600 hover:bg-primary-50',
            ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border-transparent',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md border-transparent',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    variant === 'primary' ? 'focus:ring-primary-500' : '',
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {!isLoading && Icon && <Icon className="w-4 h-4 mr-2" />}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
